import axios from "axios";

const API_URL = "https://team-task-manager-production-cac0.up.railway.app/api/ai";

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