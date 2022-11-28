import axiosInstance from "../utils/axiosInstance";

export const getChatRooms = () => axiosInstance.get("/chat/rooms");

export const getChatDetail = (roomId) => axiosInstance.get(`/chat/rooms/${roomId}`)