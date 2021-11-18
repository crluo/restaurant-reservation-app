const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation, "*")
        .then((createdReservation) => createdReservation[0]);
}

function list(date) {
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .orderBy("reservation_time");
}

module.exports = {
    create,
    list,
}