import axiosInstance from "../utils/axiosInstance";

export const askQuestion = (data) =>
  axiosInstance.post("/discussion/create-question", data);

export const getMyQuestions = () =>
  axiosInstance.get("/discussion/my-questions");

  export const getAllQuestions = () =>
  axiosInstance.get("/discussion");

export const getQuestionDetail = (id) => axiosInstance.get(`/discussion/${id}`);

export const postQuestionReply = (data, id) =>
  axiosInstance.post(`/discussion/${id}/reply`, data);
