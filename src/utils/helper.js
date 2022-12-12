import axiosInstance from "./axiosInstance";
import Pusher from "pusher-js";

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

export const setRole = (role) => localStorage.setItem("role", role);

export const removeRole = () => localStorage.removeItem("role");

export const removeAuthToken = () => {
  localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export const pusherInstance = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: "ap1",
});

export const checkYoutubeUrl = (url) => {
  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
  );

  return match && match[2].length == 11;
};

export const initSW = () => {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");

      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          window.location.reload();
        });
      }
    }
  });
};
