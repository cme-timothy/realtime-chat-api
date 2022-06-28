const modelRooms = require("../models/rooms.model");
const modelInRoom = require("../models/inRoom.model");
const modelUsers = require("../models/users.model");
const Moniker = require("moniker");

module.exports = (io, socket) => {
  socket.on("get_rooms", async () => {
    const result = await modelRooms.getAllRooms();
    const stringyResult = JSON.stringify(result);
    io.emit("all_rooms", stringyResult);
  });

  socket.on("create_room", async (data, callback) => {
    const parsedData = JSON.parse(data);
    const nameTaken = await modelRooms.getRoom(parsedData.room);
    if (nameTaken === undefined) {
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
      await modelRooms.addRoom(parsedData.room);
      console.log(
        `Socket with id: ${socket.id} has joined room: ${parsedData.room}`
      );
      socket.join(parsedData.room);
      socket.broadcast.emit("new_room", parsedData.room);

      callback({
        status: "ok",
      });
    } else {
      callback({
        status: "Room taken",
      });
    }
  });
};
