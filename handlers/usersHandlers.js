const modelUsers = require("../models/users.model");

module.exports = (io, socket) => {
  socket.on("create_user", async (data, callback) => {
    const name = typeof data;

    if (name === "string" && data !== "") {
      const nameTaken = await modelUsers.getUser(socket.id, data);
      if (nameTaken.length === 0) {
        await modelUsers.addUser(data, socket.id);
        console.log(
          `Socket with id: ${socket.id} has created username: ${data}`
        );

        callback({
          status: "ok",
        });
      } else if (nameTaken.socketId === socket.id) {
        callback({
          status: "Name is already created.",
        });
      } else {
        callback({
          status: "Name is taken.",
        });
      }
    } else {
      callback({
        status: "Name is empty.",
      });
    }
  });
};
