import axios from "axios";

const API_URL = "https://team-task-manager-backend-nswr.onrender.com/api/tasks";

// ==========================================
// GET TOKEN
// ==========================================

const getToken = () => {
  return localStorage.getItem("token");
};

// ==========================================
// GET AUTH CONFIG
// ==========================================

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ==========================================
// GET ALL TASKS
// ==========================================

export const getTasks = async () => {
  const response = await axios.get(
    API_URL,
    getConfig()
  );

  return response.data;
};

// ==========================================
// CREATE TASK
// ==========================================

export const createTask = async (
  taskData
) => {
  const response = await axios.post(
    API_URL,
    taskData,
    getConfig()
  );

  return response.data;
};

// ==========================================
// UPDATE TASK
// ==========================================

export const updateTask = async (
  id,
  taskData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    taskData,
    getConfig()
  );

  return response.data;
};

// ==========================================
// DELETE TASK
// ==========================================

export const deleteTask = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getConfig()
  );

  return response.data;
};