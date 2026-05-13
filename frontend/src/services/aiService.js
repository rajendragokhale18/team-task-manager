import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/ai";

export const generateAITasks = async (prompt) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/generate`,
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};