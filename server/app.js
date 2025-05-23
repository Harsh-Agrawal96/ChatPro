import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import {
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  ONLINE_USERS,
  START_TYPING,
  STOP_TYPING,
} from "./constants/events.js";
import { Message } from "./models/message.js";

import {v4 as uuid} from "uuid";
import { getSockets } from "./lib/helper.js";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

import dotenv from "dotenv";


dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGODB_URI;
const Port = process.env.PORT || 3500;
const envMode = process.env.NODE_ENV || "PRODUCTION";

console.log(mongoURI)

connectDB(mongoURI);

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adsasdsdfsdfsdfd";
const userSocketIDs = new Map();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req,res) => {
    res.send(
    "hello here"
    )
})


io.on("connection", (socket) => {

    console.log("a user conneted", socket.id);
    const user = {
        _id : "isodflks",
        name : "what is happening"
    }
    userSocketIDs.set(user._id.toString(), socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
        const messageForRealTime = {
        content: message,
        _id: uuid(),
        sender: {
            _id: user._id,
            name: user.name,
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
        };

        const messageForDB = {
        content: message,
        sender: user._id,
        chat: chatId,
        };

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(
            NEW_MESSAGE,
            {
              chatId,
              message: messageForRealTime,
            }
        );
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

        try {
        await Message.create(messageForDB);
        } catch (error) {
        throw new Error(error);
        }
  });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


app.use(errorMiddleware);

server.listen( Port, () => {
    console.log(`Server is runing at ${Port} port in ${envMode}`);
})


export { envMode, adminSecretKey, userSocketIDs };