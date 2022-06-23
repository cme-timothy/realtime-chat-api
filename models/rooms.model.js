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

function addRoom(name) {
  const sql = "INSERT INTO rooms (name) VALUES (?)";

  return new Promise((resolve, reject) => {
    db.run(sql, name, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function deleteRoom(name) {
  const sql = "DELETE FROM rooms WHERE name = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, name, (error) => {
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
  addRoom,
  deleteRoom,
};
