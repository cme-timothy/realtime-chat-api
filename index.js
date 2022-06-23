const { Server } = require("socket.io");

let rooms = [];

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket with id: ${socket.id} has connected`);

  socket.on("get_rooms", () => {
    socket.emit("all_rooms", rooms);
  });

  socket.on("create_room", (data) => {
    rooms.push({ roomName: data, userId: socket.id });
    console.log(`Socket with id: ${socket.id} has joined ${data}`);
    socket.join(data);
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
