import axiosInstance from "../utils/axiosInstance";

export const getImageUrl = (image) => {
  const formData = new FormData();
  formData.append("image", image);

  return axiosInstance.post("/storage/upload", formData);
};
