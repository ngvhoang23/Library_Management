import { io } from "socket.io-client";
const socket = io.connect("http://10.0.2.2:5000");
export default socket;
