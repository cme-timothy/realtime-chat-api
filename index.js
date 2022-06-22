const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket with id: ${socket.id} has connected`);

  socket.on("join_room", (data) => {
    console.log(`Socket with id: ${socket.id} has joined ${data}`);
    socket.join(data);
    console.log(socket.rooms);
  });

  socket.on("leave_room", (data) => {
    console.log(`Socket with id: ${socket.id} has left room: ${data}`);
    socket.leave(data);
    console.log(socket.rooms);
  });

  io.emit("new_client", "A new client has joined");

  socket.on("message", (data) => {
    console.log(`${socket.id} has sent ${data}`);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Socket ${socket.id} disconnected. Reason: ${reason}`);
  });
});

io.listen(4000);
