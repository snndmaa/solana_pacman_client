import axios from "axios";
import "./leaderboard.css";
import React from "react";
import Game from "../game/game";
import Main from "../main/main";
import { useEffect, useState } from "react";
import { sendSolToWinner } from "../../utils/web3/performTransaction";
import saveScore from "../game/mechanics/ghosts/collisions/pacmanDeath/gameOver/saveScore";

const scoresUrl = process.env.REACT_APP_URL
  ? `${process.env.REACT_APP_URL}/scores`
  : "https://1311-34-207-135-7.ngrok-free.app/scores";

export default function Leaderboard({ variables }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchScores = async () => {
    try {
      const res = await axios.get(scoresUrl);
      const scoresData = res.data;

      // Ensure there are at least 10 scores
      while (scoresData.length < 10) {
        scoresData.push({
          user: { username: "--" },
          score: "--",
        });
      }

      setScores(scoresData);
      
      // Handle the max score logic
      const maxScore = Math.max(
        ...scoresData
          .map(score => Number(score.score)) // Convert to number
          .filter(score => !isNaN(score))    // Filter out NaN values
      );

      if (variables.score === maxScore) {
        sendSolToWinner(variables);
      }

    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await saveScore(variables.score);
      fetchScores();
    })();
  }, [variables.score]);

  const resetVariables = () => {
    variables.score = 0;
    variables.start = true;
  };

  const handlePlayAgain = () => {
    resetVariables();
    variables.reactRoot.render(
      <Game player={variables.player} reactRoot={variables.reactRoot} />
    );
  };

  const handleChangePlayer = () => {
    resetVariables();
    variables.reactRoot.render(
      <Main user={variables.player} reactRoot={variables.reactRoot} />
    );
  };

  return (
    <div className="leaderboard">
      <h1>Game Over</h1>
      <h4>You scored {variables.score} points</h4>
      {error ? (
        <p className="error" data-testid="error">
          Oops, something went wrong!
        </p>
      ) : loading ? (
        <p className="wait-message" data-testid="wait-message">
          Please wait a moment...
        </p>
      ) : (
        <table className="list">
          <tbody>
            <tr>
              <th className="rank-header">Rank</th>
              <th className="name-header">Name</th>
              <th className="score-header">Score</th>
            </tr>
            {scores.map((score, index) => (
              <tr className="entry" key={index} aria-label={index}>
                <td className="rank">{index + 1}</td>
                <td className="name">{score.user ? score.user.username : "--"}</td>
                <td className="points">{score.score !== undefined ? score.score : "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="buttons">
        <button className="play-again" onClick={handlePlayAgain}>
          Play Again
        </button>
        <button className="home" onClick={handleChangePlayer}>
          Home
        </button>
      </div>
    </div>
  );
}
