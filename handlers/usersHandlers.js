const modelUsers = require("../models/users.model");

module.exports = (io, socket) => {
  socket.on("create_user", async (data, callback) => {
    const name = typeof data;

    if (name === "string" && data !== "") {
      const nameTaken = await modelUsers.getUser("empty", data);
      if (nameTaken === undefined) {
        await modelUsers.addUser(data, socket.id);
        console.log(
          `Socket with id: ${socket.id} has created username: ${data}`
        );

        callback({
          status: "ok",
        });
      } else {
        callback({
          status: "Name taken",
        });
      }
    } else {
      callback({
        status: "Name empty",
      });
    }
  });
};
