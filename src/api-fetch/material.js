import axiosInstance from "../utils/axiosInstance";

export const getMaterialById = (id) => axiosInstance.get(`/material/${id}`);

export const getAllMaterials = (id) => axiosInstance.get(`/material`);

export const deleteMaterial = (id) => axiosInstance.delete(`/material/${id}`);

export const createMaterial = (data) =>
  axiosInstance.post(`/material/create`, data);

export const editMaterial = (id, data) =>
  axiosInstance.put(`/material/${id}`, data);

export const getMaterialByIdWithQuiz = (id) =>
  axiosInstance.get(`/material/${id}/with-quiz`);
