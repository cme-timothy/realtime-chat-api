const modelMessages = require("../models/messages.model");

module.exports = (io, socket) => {
  socket.on("add_message", (data) => {
    const parsedData = JSON.parse(data);
    const message = typeof parsedData.message;
    const objectLength = Object.keys(parsedData).length;

    if (
      message === "string" &&
      objectLength === 4 &&
      parsedData.message.length > 0
    ) {
      async function fetch() {
        await modelMessages.addMessageRoom(
          parsedData.message,
          parsedData.room,
          parsedData.username,
          parsedData.timestamp
        );
        socket.to(parsedData.room).emit("new_message", data);
      }
      fetch();
    }
  });
};
