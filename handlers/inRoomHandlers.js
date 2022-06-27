const modelRooms = require("../models/rooms.model");
const modelInRoom = require("../models/inRoom.model");
const modelMessages = require("../models/messages.model");

module.exports = (io, socket) => {
  socket.on("get_room_data", async (data) => {
    const onlineResult = await modelInRoom.getAllUsersRoom(data);
    const stringyOnlineResult = JSON.stringify(onlineResult);
    const messagesResult = await modelMessages.getMessagesRoom(data);
    const stringyMessagesResult = JSON.stringify(messagesResult);
    io.emit("all_room_data", stringyOnlineResult, stringyMessagesResult);
  });

  socket.on("join_room", async (data) => {
    const parsedData = JSON.parse(data);
    await modelInRoom.addUserRoom(parsedData.room, parsedData.username);
    console.log(
      `Socket with id: ${socket.id} has joined room: ${parsedData.room}`
    );
    socket.join(parsedData.room);
    socket.broadcast.emit("new_user_online", parsedData.username);
  });

  socket.on("leave_room", async (data) => {
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
  });
};
