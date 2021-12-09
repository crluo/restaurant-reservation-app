const reservationsService = require("../reservations/reservations.service");
const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { table } = require("../db/connection");

function hasValidInput(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      message: "data is invalid",
    })
  }
  const input = req.body.data;
  let inputErrors = [];
  if (!input.table_name || input.table_name.length <= 1) {
    inputErrors.push("table_name is invalid");
  }
  if (!input.capacity || input.capacity < 1 || typeof input.capacity !== "number") {
    inputErrors.push("capacity is invalid");
  }
  if (inputErrors.length) {
    next({
      status: 400,
      message: inputErrors.toString(),
    })
  }
  next();
}

async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${req.params.table_id} does not exist`
  });
}
async function reservationExists(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      message: "Data is missing"
    });
  }
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    next({
      status: 400,
      message: `reservation_id is missing`
    })
  }
  const reservation = await reservationsService.read(reservation_id);
  if (!reservation) {
    next({
      status: 404,
      message: `Reservation ${reservation_id} does not exist`
    });
  }
  res.locals.reservation = reservation;
  return next();
}

function seatingRequirements(req, res, next) {
  const table = res.locals.table;
  if (res.locals.reservation.people > table.capacity) {
    next({
      status: 400,
      message: "Table capacity cannot accomodate reservation party size"
    });
  } else if (table.occupied == "Occupied") {
    next({
      status: 400,
      message: `Table ${table.table_id} is occupied`
    });
  }
  next();
}

function isTableOccupied(req, res, next) {
  if (!res.locals.table.occupied || res.locals.table.occupied === "Free") {
    next({
      status: 400,
      message: `table ${res.locals.table.table_id} is not occupied`
    })
  }
  next();
}

async function create(req, res) {
  const newTable = await tablesService.create(req.body.data);
  res.status(201).json({ data: newTable });
}

async function update(req, res) {
  const updatedTable = await tablesService.update(res.locals.reservation.reservation_id, res.locals.table.table_id);
  res.json({ data: updatedTable });
}

async function destroy(req, res) {
  const { table_id, reservation_id } = res.locals.table;
  await tablesService.destroy(table_id);
  res.sendStatus(200);
}

async function list(req, res) {
  const tables = await tablesService.list();
  res.json({ data: tables });
}

module.exports = {
  create: [ hasValidInput, asyncErrorBoundary(create) ],
  update: [ asyncErrorBoundary(tableExists), asyncErrorBoundary(reservationExists), seatingRequirements, asyncErrorBoundary(update) ],
  destroy: [ asyncErrorBoundary(tableExists), isTableOccupied, asyncErrorBoundary(destroy) ],
  list,
};