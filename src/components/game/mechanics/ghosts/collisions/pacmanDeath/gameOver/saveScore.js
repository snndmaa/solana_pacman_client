import axios from "axios";

export default async function saveScore(score) {
  const data = {
    userName: localStorage.getItem,
    score,
  };
  try {
    const res = await axios.post('http://ec2-34-207-135-7.compute-1.amazonaws.com:9000/scores', data);
    return `Success: ${res.data.message}`;
  } catch (err) {
    return `Error: ${err.response.statusText}`;
  }
}
