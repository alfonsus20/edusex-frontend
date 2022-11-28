import axiosInstance from "../utils/axiosInstance";

export const getProfile = () => axiosInstance.get("/profile");
