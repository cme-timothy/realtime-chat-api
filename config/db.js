const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
  const roomsStmt = `
    CREATE TABLE rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )
    `;
  const usersStmt = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )
    `;
  const messagesStmt = `
    CREATE TABLE messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        room_id INTEGER,
        user_id INTEGER
    )
    `;
  db.run(roomsStmt, (error) => {
    if (error) {
      console.error(error.message);
    }
  });
  db.run(usersStmt, (error) => {
    if (error) {
      console.error(error.message);
    }
  });
  db.run(messagesStmt, (error) => {
    if (error) {
      console.error(error.message);
    }
  });
});

module.exports = db;
