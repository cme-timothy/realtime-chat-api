const modelUsers = require("../models/users.model");
const modelInRoom = require("../models/inRoom.model");

module.exports = (io, socket) => {
  console.log(`Socket with id: ${socket.id} has connected`);

  socket.on("disconnect", async (reason) => {
    const result = await modelInRoom.getUserRoom(socket.id);
    await modelInRoom.deleteUserRoom(socket.id);
    await modelUsers.deleteUser(socket.id);
    console.log(`Socket with id: ${socket.id} disconnected. Reason: ${reason}`);
    if (result !== undefined) {
      socket.leave(result.room);
      socket.broadcast.emit("user_offline", result.username);
    }
  });
};
