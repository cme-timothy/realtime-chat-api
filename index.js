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
      io.emit("all_rooms", result);
    }
    fetch();
  });

  socket.on("create_room", (data) => {
    async function fetch() {
      await model.addRoom(data);
      console.log(`Socket with id: ${socket.id} has joined ${data}`);
      socket.join(data);
      const result = await modelRooms.getAllRooms();
      io.emit("all_rooms", result);
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

  socket.on("join_room", (data) => {
    rooms.push({ roomName: data, userId: socket.id });
    console.log(`Socket with id: ${socket.id} has joined ${data}`);
    socket.join(data);
  });

  socket.on("leave_room", (data) => {
    rooms = rooms.filter((room) => room.roomName !== data);
    console.log(`Socket with id: ${socket.id} has left room: ${data}`);
    socket.leave(data);
  });

  socket.on("message", (data) => {
    const parsedData = JSON.parse(data);
    socket.to(parsedData.roomName).emit("new_message", parsedData.message);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Socket ${socket.id} disconnected. Reason: ${reason}`);
  });
});

io.listen(4000);
