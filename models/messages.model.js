const db = require("../config/db");

function getMessagesRoom(room) {
  const sql = "SELECT * FROM messages WHERE room = ?";

  return new Promise((resolve, reject) => {
    db.all(sql, room, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function addMessageRoom(message, room, username, timestamp) {
  const sql =
    "INSERT INTO messages (message, room, username, timestamp) VALUES (?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [message, room, username, timestamp], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function deleteMessagesRoom(room) {
  const sql = "DELETE FROM messages WHERE room = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, room, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  getMessagesRoom,
  addMessageRoom,
  deleteMessagesRoom,
};
