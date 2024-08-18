import "module-alias/register";
import "dotenv/config";

import http from "http";
import express, { Application } from "express";
import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

import type { Message } from "@shared/types";

import socketEvents from "@shared/socketEvents";

const PORT = process.env.PORT;

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users: Record<string, string> = {};

io.on(socketEvents.CONNECTION, (socket: Socket) => {
  console.log("Socket connected:", socket.id);

  const userId = socket.handshake.query.userId
    ? String(socket.handshake.query.userId)
    : uuidv4();

  users[userId] = userId;
  socket.emit(socketEvents.REGISTER, userId);
  io.emit(socketEvents.ONLINE_COUNT, Object.keys(users).length);

  console.log("User connected:", userId);

  socket.on(socketEvents.SEND_MESSAGE, (data: { message: string }) => {
    const message: Message = {
      userId: userId,
      message: data.message,
      timestamp: new Date(),
    };
    io.emit(socketEvents.RECEIVE_MESSAGE, message);
  });

  socket.on(socketEvents.DISCONNECT, () => {
    console.log("User disconnected:", socket.id);
    delete users[userId];
    io.emit(socketEvents.ONLINE_COUNT, Object.keys(users).length);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
