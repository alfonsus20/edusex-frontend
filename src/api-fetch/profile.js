import axiosInstance from "../utils/axiosInstance";

export const getProfile = () => axiosInstance.get("/profile");

export const editProfile = (data) => axiosInstance.put("/profile", data);
