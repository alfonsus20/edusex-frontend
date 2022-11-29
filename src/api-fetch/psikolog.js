import axiosInstance from "../utils/axiosInstance";

export const getAllPsikolog = () => axiosInstance.get("/psikolog");

export const createPsikologAccount = (data) =>
  axiosInstance.post("/psikolog/create", data);
