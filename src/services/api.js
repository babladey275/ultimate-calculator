import axios from "axios";

const api = axios.create({
  baseURL: "https://investment-calculator-backend.dev.quantumos.ai/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication APIs
export const loginUser = async (phoneNumber, pin) => {
  try {
    const response = await api.post("/contacts/authenticate", {
      phoneNumber,
      pin,
    });
    console.log("api file", response);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

export const createQuestionnaire = async (questionnaireData) => {
  try {
    const response = await api.post("/questionnaires", questionnaireData);
    return response.data;
  } catch (error) {
    console.error("Error creating estimate:", error);
    throw error;
  }
};

export const createCalculate = async (calculateData) => {
  console.log("calculate data", calculateData);
  try {
    const response = await api.post("/calculations", calculateData);

    console.log("calculate response data", response);
    return response.data;
  } catch (error) {
    console.error("Error creating estimate:", error);
    throw error;
  }
};

export const createFeedbacks = async (feedbacksData) => {
  try {
    console.log("feedback data", feedbacksData);
    const response = await api.post("/feedbacks", feedbacksData);

    console.log("feedbacks response data", response);
    return response.data;
  } catch (error) {
    console.error("Error creating estimate:", error);
    throw error;
  }
};

export default api;
