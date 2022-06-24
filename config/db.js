const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
  const roomsStmt = `
    CREATE TABLE rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room TEXT UNIQUE
    )
    `;
  const usersStmt = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE
    )
    `;
  const inRoomStmt = `
    CREATE TABLE inRoom (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room TEXT,
        username TEXT
    )
    `;
  const messagesStmt = `
    CREATE TABLE messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        room TEXT,
        username TEXT,
        timestamp TEXT
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
  db.run(inRoomStmt, (error) => {
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
