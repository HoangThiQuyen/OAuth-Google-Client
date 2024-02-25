import { io } from "socket.io-client";
// tạo 1 connect tới server mà k cần dùng tới socket.connect()
const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export default socket;
