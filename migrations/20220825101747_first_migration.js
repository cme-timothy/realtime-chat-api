/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("rooms", (table) => {
      table.increments("id").primary();
      table.text("room").unique();
    })
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.text("username").unique();
      table.text("socketId").unique();
    })
    .createTable("inRoom", (table) => {
      table.increments("id").primary();
      table.text("room");
      table.text("username").unique();
      table.text("socketId").unique();
    })
    .createTable("messages", (table) => {
      table.increments("id").primary();
      table.text("message");
      table.text("room");
      table.text("username");
      table.text("timestamp");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("rooms")
    .dropTable("users")
    .dropTable("inRoom")
    .dropTable("messages");
};
