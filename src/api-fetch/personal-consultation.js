import axiosInstance from "../utils/axiosInstance";

export const getChatRooms = () => axiosInstance.get("/chat/rooms");

export const getChatDetail = (roomId) =>
  axiosInstance.get(`/chat/rooms/${roomId}`);

export const sendChat = (data) => axiosInstance.post(`/chat`, data);

export const createChatRoom = (data) =>
  axiosInstance.post("/chat/create-room", data);
