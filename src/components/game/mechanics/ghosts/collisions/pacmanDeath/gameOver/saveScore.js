import axios from "axios";

export default async function saveScore(score) {
  const data = {
    userName: localStorage.getItem,
    score,
  };
  try {
    const res = await axios.post('https://1311-34-207-135-7.ngrok-free.app/scores', data);
    return `Success: ${res.data.message}`;
  } catch (err) {
    return `Error: ${err.response.statusText}`;
  }
}
