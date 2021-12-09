const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation, "*")
        .then((createdReservation) => createdReservation[0]);
}

function read(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .first();
}

function updateStatus(reservationId, status) {
    return knex("reservations")
        .where({ reservation_id: reservationId })
        .update({ status: status })
        .returning("*")
        .then((updatedReservation) => updatedReservation[0]);
}
function list(date) {
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .orderBy("reservation_time");
}

module.exports = {
    create,
    read,
    updateStatus,
    list,
}