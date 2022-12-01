import axiosInstance from "../utils/axiosInstance";

export const getAllNotifications = () => axiosInstance.get("/notification");

export const markAllNotificationAsRead = () =>
  axiosInstance.get("/notification/read-all");

export const readNotification = (id) =>
  axiosInstance.get(`/notification/${id}/read`);
