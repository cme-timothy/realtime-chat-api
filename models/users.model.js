const db = require("../config/db");

function getUser(socketId) {
  const sql = "SELECT * FROM users WHERE socketId = ?";

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

function addUser(username, socketId) {
  const sql = "INSERT INTO users (username, socketId) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, username, socketId, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function deleteUser(socketId) {
  const sql = "DELETE FROM users WHERE socketId = ?";

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
  getUser,
  addUser,
  deleteUser,
};
