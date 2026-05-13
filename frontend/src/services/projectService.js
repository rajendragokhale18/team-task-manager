import axios from "axios";

const API_URL =
  "https://team-task-manager-production-cac0.up.railway.app/api/projects";

// ==========================================
// TOKEN
// ==========================================

const getToken = () => {
  return localStorage.getItem("token");
};

// ==========================================
// CONFIG
// ==========================================

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ==========================================
// GET PROJECTS
// ==========================================

export const getProjects =
  async () => {
    const response = await axios.get(
      API_URL,
      getConfig()
    );

    return response.data;
  };

// ==========================================
// CREATE PROJECT
// ==========================================

export const createProject =
  async (projectData) => {
    const response =
      await axios.post(
        API_URL,
        projectData,
        getConfig()
      );

    return response.data;
  };