const modelMessages = require("../models/messages.model");

module.exports = (io, socket) => {
  socket.on("add_message", (data) => {
    async function fetch() {
      const parsedData = JSON.parse(data);
      await modelMessages.addMessageRoom(
        parsedData.message,
        parsedData.room,
        parsedData.username,
        parsedData.timestamp
      );
      socket.to(parsedData.room).emit("new_message", data);
    }
    fetch();
  });
};
