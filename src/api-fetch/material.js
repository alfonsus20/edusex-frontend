import axiosInstance from "../utils/axiosInstance";

export const getMaterialById = (id) => axiosInstance.get(`/material/${id}`);
