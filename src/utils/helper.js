import axiosInstance from "./axiosInstance";

export const getEmbedYoutubeURL = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoID = match && match[2].length === 11 ? match[2] : null;
  return `https://www.youtube.com/embed/${videoID}`;
};

export const setDefaultToken = () => {
  const token = localStorage.getItem("token");
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
  setDefaultToken();
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};
