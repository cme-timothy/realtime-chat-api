const db = require("../config/db");

function getAllUsersRoom(room) {
  const sql = "SELECT * FROM inRoom WHERE room = ?";

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

function getUserRoom(socketId) {
  const sql = "SELECT * FROM inRoom WHERE socketId = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, socketId, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function addUserRoom(room, username, socketId) {
  const sql = "INSERT INTO inRoom (room, username, socketId) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, room, username, socketId, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function deleteUserRoom(socketId) {
  const sql = "DELETE FROM inRoom WHERE socketId = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, socketId, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  getAllUsersRoom,
  getUserRoom,
  addUserRoom,
  deleteUserRoom,
};
