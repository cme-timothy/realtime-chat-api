const { Server } = require("socket.io");
const modelRooms = require("./models/rooms.model");
const modelUsers = require("./models/users.model");
const modelInRoom = require("./models/inRoom.model");
const modelMessages = require("./models/messages.model");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket with id: ${socket.id} has connected`);

  socket.on("get_rooms", () => {
    async function fetch() {
      const result = await modelRooms.getAllRooms();
      const stringyResult = JSON.stringify(result);
      io.emit("all_rooms", stringyResult);
    }
    fetch();
  });

  socket.on("create_room", (data) => {
    async function fetch() {
      const parsedData = JSON.parse(data);
      await modelRooms.addRoom(parsedData.room);
      await modelInRoom.addUserRoom(parsedData.room, parsedData.username);
      console.log(
        `Socket with id: ${socket.id} has joined room: ${parsedData.room}`
      );
      socket.join(parsedData.room);
      socket.broadcast.emit("new_room", parsedData.room);
      socket.broadcast.emit("new_user_online", parsedData.username);
    }
    fetch();
  });

  socket.on("create_user", (data) => {
    async function fetch() {
      await modelUsers.addUser(data);
      console.log(`Socket with id: ${socket.id} has created username: ${data}`);
    }
    fetch();
  });

  socket.on("get_room_data", (data) => {
    async function fetch() {
      const onlineResult = await modelInRoom.getAllUsersRoom(data);
      const stringyOnlineResult = JSON.stringify(onlineResult);
      const messagesResult = await modelMessages.getMessagesRoom(data);
      const stringyMessagesResult = JSON.stringify(messagesResult);
      io.emit("all_room_data", stringyOnlineResult, stringyMessagesResult);
    }
    fetch();
  });

  socket.on("join_room", (data) => {
    async function fetch() {
      const parsedData = JSON.parse(data);
      await modelInRoom.addUserRoom(parsedData.room, parsedData.username);
      console.log(
        `Socket with id: ${socket.id} has joined room: ${parsedData.room}`
      );
      socket.join(parsedData.room);
      socket.broadcast.emit("new_user_online", parsedData.username);
    }
    fetch();
  });

  socket.on("leave_room", (data) => {
    async function fetch() {
      const parsedData = JSON.parse(data);
      await modelInRoom.deleteUserRoom(parsedData.room, parsedData.username);
      console.log(
        `Socket with id: ${socket.id} has left room: ${parsedData.room}`
      );
      socket.leave(parsedData.room);

      const result = await modelInRoom.getAllUsersRoom(parsedData.room);
      if (result.length === 0) {
        await modelRooms.deleteRoom(parsedData.room);
        await modelMessages.deleteMessagesRoom(parsedData.room);
        io.emit("room_deleted", parsedData.room);
      } else {
        socket.broadcast.emit("user_offline", parsedData.username);
      }
    }
    fetch();
  });

  socket.on("add_message", (data) => {
    async function fetch() {
      const parsedData = JSON.parse(data);
      await modelMessages.addMessageRoom(
        parsedData.message,
        parsedData.room,
        parsedData.username,
        parsedData.timestamp
      );
      socket.to(parsedData.room).emit("new_message", data);
    }
    fetch();
  });

  socket.on("disconnect", (reason) => {
    console.log(`Socket with id: ${socket.id} disconnected. Reason: ${reason}`);
  });
});

io.listen(4000);
