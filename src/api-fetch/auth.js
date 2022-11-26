import axiosInstance from "../utils/axiosInstance";

export const authLogin = (data) => axiosInstance.post("/auth/login", data);
export const authRegister = (data) =>
  axiosInstance.post("/auth/register", data);
