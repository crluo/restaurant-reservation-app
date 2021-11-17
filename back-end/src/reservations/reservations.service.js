const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation, "*")
        .then((createdReservation) => createdReservation[0]);
}

module.exports = {
    create,
}