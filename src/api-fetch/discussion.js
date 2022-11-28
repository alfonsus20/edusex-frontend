import axiosInstance from "../utils/axiosInstance";

export const askQuestion = (data) =>
  axiosInstance.post("/discussion/create-question", data);
