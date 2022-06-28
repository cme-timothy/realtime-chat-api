const db = require("../config/db");

function getAllRooms() {
  const sql = "SELECT * FROM rooms";

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getRoom(room) {
  const sql = "SELECT * FROM rooms WHERE room = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, room, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function addRoom(room) {
  const sql = "INSERT INTO rooms (room) VALUES (?)";

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

function deleteRoom(room) {
  const sql = "DELETE FROM rooms WHERE room = ?";

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
  getAllRooms,
  getRoom,
  addRoom,
  deleteRoom,
};
