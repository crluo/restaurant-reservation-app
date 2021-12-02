const knex = require("../db/connection");

function create(newTable) {
    return knex("tables")
        .insert(newTable, "*")
        .then((createdTable) => createdTable[0]);
}

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name")
}
module.exports = {
    create,
    list,
};