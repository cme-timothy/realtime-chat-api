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

function addUserRoom(room, username) {
  const sql = "INSERT INTO inRoom (room, username) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, room, username, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function deleteUserRoom(room, username) {
  const sql = "DELETE FROM inRoom WHERE room = ? AND username = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, room, username, (error) => {
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
  addUserRoom,
  deleteUserRoom,
};
