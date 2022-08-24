const { Server } = require("socket.io");
const connectionTypeHandlers = require("./handlers/connectionTypeHandlers");
const roomsHandlers = require("./handlers/roomsHandler");
const usersHandlers = require("./handlers/usersHandlers");
const inRoomHandlers = require("./handlers/inRoomHandlers");
const messagesHandlers = require("./handlers/messagesHandlers");
const loggingMiddleware = require("./middlewares/logging");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const onConnection = (socket) => {
  connectionTypeHandlers(io, socket);
  roomsHandlers(io, socket);
  usersHandlers(io, socket);
  inRoomHandlers(io, socket);
  messagesHandlers(io, socket);
};

io.on("connection", onConnection);

io.use(loggingMiddleware);

io.listen(process.env.PORT);
