const modelRooms = require("../models/rooms.model");
const modelInRoom = require("../models/inRoom.model");

module.exports = (io, socket) => {
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
};
