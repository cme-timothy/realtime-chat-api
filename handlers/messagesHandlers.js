const modelMessages = require("../models/messages.model");

module.exports = (io, socket) => {
  socket.on("add_message", async (data) => {
    const parsedData = JSON.parse(data);
    const message = typeof parsedData.message;
    const objectLength = Object.keys(parsedData).length;

    if (
      message === "string" &&
      objectLength === 4 &&
      parsedData.message.length > 0
    ) {
      await modelMessages.addMessageRoom(
        parsedData.message,
        parsedData.room,
        parsedData.username,
        parsedData.timestamp
      );
      socket.to(parsedData.room).emit("new_message", data);
      socket.to(parsedData.room).emit("user_regret", data);
    }
  });

  socket.on("typing_message", (data) => {
    const parsedData = JSON.parse(data);
    socket.to(parsedData.room).emit("user_typing", data);
  });

  socket.on("no_message", (data) => {
    const parsedData = JSON.parse(data);
    socket.to(parsedData.room).emit("user_regret", data);
  });
};
