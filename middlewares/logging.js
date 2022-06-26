const fs = require("fs");

const logFile = fs.createWriteStream("message-recieved.log", { flags: "a" });

function logging(socket, next) {
  socket.on("add_message", (data) => {
    const parsedData = JSON.parse(data);
    const room = parsedData.room;
    const username = parsedData.username;
    const timestamp = parsedData.timestamp;
    logFile.write(
      `Username: ${username} in room: ${room} sent a message at time: ${timestamp}` +
        "\n"
    );
  });
  next();
}

module.exports = logging;
