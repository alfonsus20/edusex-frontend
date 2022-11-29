import axiosInstance from "../utils/axiosInstance";

export const getQuizInfo = (id) => axiosInstance.get(`/quiz/${id}`);

export const getQuizQuestions = (id) =>
  axiosInstance.get(`/quiz/${id}/questions`);

export const submitQuizAnswers = (id, data) =>
  axiosInstance.post(`/quiz/${id}/answer`, data);

export const getQuizResult = (id) => axiosInstance.get(`/quiz-attempt/${id}`);
