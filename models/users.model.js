const db = require("../config/db");

function getUser(username) {
  const sql = "SELECT * FROM users WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, username, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function addUser(username) {
  const sql = "INSERT INTO users (name) VALUES (?)";

  return new Promise((resolve, reject) => {
    db.run(sql, username, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function deleteUser(username) {
  const sql = "DELETE FROM users WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, username, (error) => {
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
