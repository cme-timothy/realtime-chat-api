const modelUsers = require("../models/users.model");

module.exports = (io, socket) => {
  socket.on("create_user", async (data) => {
    await modelUsers.addUser(data);
    console.log(`Socket with id: ${socket.id} has created username: ${data}`);
  });
};
