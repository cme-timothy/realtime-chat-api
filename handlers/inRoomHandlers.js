const modelRooms = require("../models/rooms.model");
const modelInRoom = require("../models/inRoom.model");
const modelMessages = require("../models/messages.model");
const modelUsers = require("../models/users.model");
const Moniker = require("moniker");

module.exports = (io, socket) => {
  socket.on("get_room_data", async (data) => {
    const onlineResult = await modelInRoom.getAllUsersRoom(data);
    const excludeSender = onlineResult.filter(
      (user) => user.socketId !== socket.id
    );
    const stringyOnlineResult = JSON.stringify(excludeSender);
    const messagesResult = await modelMessages.getMessagesRoom(data);
    const stringyMessagesResult = JSON.stringify(messagesResult);
    const userResult = await modelUsers.getUser(socket.id);
    const stringyUserResult = JSON.stringify(userResult[0]);
    io.emit(
      "all_room_data",
      stringyOnlineResult,
      stringyMessagesResult,
      stringyUserResult
    );
  });

  socket.on("join_room", async (data) => {
    const parsedData = JSON.parse(data);
    const alreadyInRoom = await modelInRoom.getUserRoom(
      socket.id,
      parsedData.username
    );
    if (alreadyInRoom.length === 0) {
      socket.join(parsedData.room);
      if (parsedData.username === "") {
        const guestUsername = `Guest-${Moniker.choose()}`;
        await modelUsers.addUser(guestUsername, socket.id);
        console.log(
          `Socket with id: ${socket.id} has guest username: ${guestUsername}`
        );
        await modelInRoom.addUserRoom(
          parsedData.room,
          guestUsername,
          socket.id
        );
        socket.to(parsedData.room).emit("new_user_online", guestUsername);
      } else {
        await modelInRoom.addUserRoom(
          parsedData.room,
          parsedData.username,
          socket.id
        );
        socket.to(parsedData.room).emit("new_user_online", parsedData.username);
      }
      console.log(
        `Socket with id: ${socket.id} has joined room: ${parsedData.room}`
      );
    }
  });

  socket.on("leave_room", async (data) => {
    const parsedData = JSON.parse(data);
    await modelInRoom.deleteUserRoom(socket.id);
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
      socket.to(parsedData.room).emit("user_offline", parsedData.username);
    }
  });
};
