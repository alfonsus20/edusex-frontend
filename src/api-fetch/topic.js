import axiosInstance from "../utils/axiosInstance";

export const fetchAllTopics = () => axiosInstance.get("/topic");

export const fetchTopicsWithProgress = () =>
  axiosInstance.get("/topic/progress");

export const getTopicById = (id) => axiosInstance.get(`/topic/${id}`);
