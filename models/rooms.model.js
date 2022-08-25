const config = require("../knexfile");
const knex = require("knex")(config[process.env.NODE_ENV] || config["development"]);

async function getAllRooms() {
  try {
    const allRooms = await knex.select().from("rooms");
    return allRooms;
  } catch (error) {
    console.log(error);
  }
}

async function getRoom(room) {
  try {
    const foundRoom = await knex.select().table("rooms").where({ room: room });
    return foundRoom;
  } catch (error) {
    console.log(error);
  }
}

async function addRoom(room) {
  try {
    const insertRoom = await knex("rooms").insert({ room: room });
    return insertRoom;
  } catch (error) {
    console.log(error);
  }
}

async function deleteRoom(room) {
  if (room === undefined) {
    return [];
  } else {
    try {
      const deleteRoom = await knex("rooms").where({ room: room }).del();
      return deleteRoom;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  getAllRooms,
  getRoom,
  addRoom,
  deleteRoom,
};
