const modelUsers = require("../models/users.model");
const modelInRoom = require("../models/inRoom.model");
const modelRooms = require("../models/rooms.model");
const modelMessages = require("../models/messages.model");

module.exports = (io, socket) => {
  console.log(`Socket with id: ${socket.id} has connected`);

  socket.on("disconnect", async (reason) => {
    const inRoomResult = await modelInRoom.getUserRoom(socket.id);
    await modelInRoom.deleteUserRoom(socket.id);
    await modelUsers.deleteUser(socket.id);
    console.log(`Socket with id: ${socket.id} disconnected. Reason: ${reason}`);
    if (inRoomResult.length !== 0) {
      socket.leave(inRoomResult.room);
      socket.broadcast.emit("user_offline", inRoomResult.username);
      const allUsersInRoomResult = await modelInRoom.getAllUsersRoom(
        inRoomResult.room
      );
      if (allUsersInRoomResult.length === 0) {
        await modelRooms.deleteRoom(inRoomResult.room);
        await modelMessages.deleteMessagesRoom(inRoomResult.room);
        io.emit("room_deleted", inRoomResult.room);
      }
    }
  });
};
