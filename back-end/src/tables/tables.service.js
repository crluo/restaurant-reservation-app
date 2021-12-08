const knex = require("../db/connection");

function create(newTable) {
    return knex("tables")
        .insert(newTable, "*")
        .then((createdTable) => createdTable[0]);
}

function read(tableId) {
    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .first();
}

function update(reservationId, tableId) {
    return knex("tables")
        .where({ table_id: tableId })
        .update({
            reservation_id: `${reservationId}`,
            occupied: `Occupied`
        });
}

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

module.exports = {
    create,
    read,
    update,
    list,    
};