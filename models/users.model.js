const config = require("../knexfile");
const knex = require("knex")(
  config[process.env.NODE_ENV] || config["development"]
);

async function getUser(socketId, username) {
  if (username === undefined) {
    try {
      const foundUser = await knex
        .select()
        .from("users")
        .where({ socketId: socketId });
      return foundUser;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const foundUser = await knex
        .select()
        .from("users")
        .where({ socketId: socketId })
        .orWhere({ username: username });
      return foundUser;
    } catch (error) {
      console.log(error);
    }
  }
}

async function addUser(username, socketId) {
  try {
    const insertUser = await knex("users").insert({
      username: username,
      socketId: socketId,
    });
    return insertUser;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(socketId) {
  try {
    const deleteUser = await knex("users").where({ socketId: socketId }).del();
    return deleteUser;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUser,
  addUser,
  deleteUser,
};
