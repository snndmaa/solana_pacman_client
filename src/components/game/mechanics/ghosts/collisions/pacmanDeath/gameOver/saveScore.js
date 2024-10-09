import axios from "axios";
import { PROD_URL } from "../../../../../../../utils/env";

export default async function saveScore(score) {
  const data = {
    userName: localStorage.getItem('username'), // Ensure you provide the correct key
    score,
  };

  try {
    await axios.post(`${PROD_URL}/scores`, data, {
      withCredentials: true, // This is important if you are using cookies for authentication
    });
    console.log('Score saved!');
  } catch (err) {
    console.error('Error saving score:', err); // Log the full error for better debugging
    return `Error: ${err.response ? err.response.statusText : 'Network error'}`;
  }
}
