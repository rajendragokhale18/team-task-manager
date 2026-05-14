import axios from "axios";

const API_URL =
  "https://team-task-manager-backend-nswr.onrender.com/api/auth";

// ======================================
// REGISTER
// ======================================

export const registerUser =
  async (userData) => {
    const response = await axios.post(
      `${API_URL}/register`,
      userData
    );

    if (response.data.token) {
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );
    }

    return response.data;
  };

// ======================================
// LOGIN
// ======================================

export const loginUser =
  async (userData) => {
    const response = await axios.post(
      `${API_URL}/login`,
      userData
    );

    if (response.data.token) {
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );
    }

    return response.data;
  };

// ======================================
// LOGOUT
// ======================================

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ======================================
// GET CURRENT USER
// ======================================

export const getCurrentUser = () => {
  try {
    const user =
      localStorage.getItem("user");

    if (!user || user === "undefined") {
      return null;
    }

    return JSON.parse(user);
  } catch (error) {
    console.log(error);

    return null;
  }
};