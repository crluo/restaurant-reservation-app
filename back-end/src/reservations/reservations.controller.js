const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

/**
 * validates whether client input is valid and sends corresponding error message
 */
function hasValidInput(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      messge: "data is invalid",
    })
  }
  const input = req.body.data;
  const regexTime = new RegExp(/([01]?[0-9]|2[0-3]):[0-5][0-9]/);
  const regexDate = new RegExp(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
  for ( let field of VALID_FIELDS ) {
    if (!input[field]) {
      next({
        status: 400,
        message: `${field} is invalid`,
      })
    }
  }
  if (!regexTime.test(input.reservation_time)) {
    next({
      status: 400,
      message: `reservation_time is invalid`,
    });
  }
  if (!regexDate.test(input.reservation_date)) {
    next({
      status: 400,
      message: `reservation_date is invalid`,
    });
  }
  if (typeof input.people != "number") {
    next({
      status: 400,
      message: `people is not a number`,
    })
  }
  next();
}
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const reservation_date = req.query.date;
  const reservations = await service.list(reservation_date);
  res.json({ data: reservations });
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

module.exports = {
  list: [ asyncErrorBoundary(list) ],
  create: [ hasValidInput, asyncErrorBoundary(create) ],
};
