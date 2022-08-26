const config = require("../knexfile");
const knex = require("knex")(
  config[process.env.NODE_ENV] || config["development"]
);

async function getAllUsersRoom(room) {
  if (room === undefined) {
    return [];
  } else {
    try {
      const allUsersRoom = await knex
        .select()
        .from("inroom")
        .where({ room: room });
      return allUsersRoom;
    } catch (error) {
      console.log(error);
    }
  }
}

async function getUserRoom(socketId, username) {
  if (username === undefined) {
    try {
      const foundUserRoom = await knex
        .select()
        .from("inroom")
        .where({ socketId: socketId });
      return foundUserRoom;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const foundUserRoom = await knex
        .select()
        .from("inroom")
        .where({ socketId: socketId })
        .orWhere({ username: username });
      return foundUserRoom;
    } catch (error) {
      console.log(error);
    }
  }
}

async function addUserRoom(room, username, socketId) {
  try {
    const insertUserRoom = await knex("inroom").insert({
      room: room,
      username: username,
      socketId: socketId,
    });
    return insertUserRoom;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserRoom(socketId) {
  try {
    const deleteUserRoom = await knex("inroom")
      .where({ socketId: socketId })
      .del();
    return deleteUserRoom;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsersRoom,
  getUserRoom,
  addUserRoom,
  deleteUserRoom,
};
