const config = require("../knexfile");
const knex = require("knex")(
  config[process.env.NODE_ENV] || config["development"]
);

async function getMessagesRoom(room) {
  try {
    const foundMessages = await knex
      .select()
      .from("messages")
      .where({ room: room });
    return foundMessages;
  } catch (error) {
    console.log(error);
  }
}

async function addMessageRoom(message, room, username, timestamp) {
  try {
    const insertMessage = await knex("messages").insert({
      message: message,
      room: room,
      username: username,
      timestamp: timestamp,
    });
    return insertMessage;
  } catch (error) {
    console.log(error);
  }
}

async function deleteMessagesRoom(room) {
  if (room === undefined) {
    return [];
  } else {
    try {
      const deleteMessages = await knex("messages").where({ room: room }).del();
      return deleteMessages;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  getMessagesRoom,
  addMessageRoom,
  deleteMessagesRoom,
};
