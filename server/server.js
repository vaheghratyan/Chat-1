const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
require("dotenv").config();

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const PORT = process.env.PORT || 5000;
const MessageModel = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET, POST"],
    credentials: true,
  },
});

mongoose.connect(
  "mongodb+srv://vageigitian:tocalifornia@cluster0.kftx6.gcp.mongodb.net/chat?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/room", async (req, res) => {
  // MessageModel.find({}, (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.send(result);
  // });
});

app.post("/room", async (req, res) => {
  // const messageText = req.body.text;
  // const message = new MessageModel({ text: messageText });
  // try {
  //   await message.save();
  //   res.send("inserted data");
  // } catch (err) {
  //   console.log(err);
  // }
});

app.get("/messages", async (req, res) => {
  // MessageModel.find({}, (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.send(result);
  // });
});

app.post("/messages", async (req, res) => {
  // const messageText = req.body.text;
  // const message = new MessageModel({ text: messageText });
  // try {
  //   await message.save();
  //   res.send("inserted data");
  // } catch (err) {
  //   console.log(err);
  // }
});

app.post("/user", async (req, res) => {
  // const messageText = req.body.text;
  // const message = new MessageModel({ text: messageText });
  // try {
  //   await message.save();
  //   res.send("inserted data");
  // } catch (err) {
  //   console.log(err);
  // }
});

io.on("connection", (socket) => {
  const getCurrentTime = () => {
    let now = new Date();
    return now.getHours() + ":" + now.getMinutes();
  };

  socket.on("join", ({ name, room, photo }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
      photo,
    });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to '${user.room}'`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      time: getCurrentTime(),
      photo: user.photo,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
    }
  });
});

app.use(cors());
app.use(express.json());
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port:${PORT}`));
