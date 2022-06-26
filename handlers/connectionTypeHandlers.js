module.exports = (io, socket) => {
  console.log(`Socket with id: ${socket.id} has connected`);

  socket.on("disconnect", (reason) => {
    console.log(`Socket with id: ${socket.id} disconnected. Reason: ${reason}`);
  });
};
