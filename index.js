const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.set("strictQuery", false);
require("dotenv").config();
const { Server } = require("socket.io");
const { createServer } = require("http");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["Get", "Post", "Put", "Delete"],
    credentials: true,
  },
});
app.get('/', (req, res) => {
  res.send('WebSocket server is running');
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("connection failed", err);
  });
app.use(require("./route/userRoute.js"));
server.listen(process.env.PORT, (port) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
let onlineUser = [];

io.on("connection", (socket) => {
  console.log("connection socket Established", socket.id);
  socket.on("NewUser", (userId) => {
    !onlineUser.some((user) => user.userId === userId) &&
      onlineUser.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getonlineUser", onlineUser);
  });
  socket.on("sendMessage", (msg) => {
    const user = onlineUser?.find((use) => use?.userId === msg?.recipientId);
    if (user) {
      io.emit("getMessage", msg);
      io.emit("getNotification", {
        senderId: msg?.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });
  socket.on("disconnect", () => {
    onlineUser = onlineUser.filter((user) => user?.userId !== socket.id);
    io.emit("getonlineUser", onlineUser);
  });
})