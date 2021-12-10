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
      message: "data is invalid",
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
  if ( input.status === "seated" || input.status === "finished") {
    next({
      status: 400,
      message: "status cannot be seated or finished"
    });
  }
  next();
}

function validReservationTime(req, res, next) {
  res.locals.reservation_date = new Date(req.body.data.reservation_date);
  res.locals.reservation_time = req.body.data.reservation_time;
  let openingTime = new Date("1990-01-01 10:30:00")
  let closingTime = new Date("1990-01-01 21:30:00")
  openingTime = `${openingTime.getHours()}` + `${openingTime.getMinutes()}`;
  closingTime = `${closingTime.getHours()}` + `${closingTime.getMinutes()}`;
  let reservationTime = res.locals.reservation_time.replace(":", "");
  
  let inputErrors = [];
  if (res.locals.reservation_date.getDay() == 1) {
    inputErrors.push("The restaurant is closed on Tuesday")
  }
  if (res.locals.reservation_date < Date.now()) {
    inputErrors.push("Reservation date/time must occur in the future")
  }
  if (reservationTime < openingTime || reservationTime > closingTime) {
    inputErrors.push("Please select a time between 10:30 and 21:30");
  }

  if (inputErrors.length) {
    next({
      status: 400,
      message: inputErrors.toString(),
    })
  }
  next();
}

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${req.params.reservation_id} does not exist`
  });
}

function validStatus(req, res, next) {
  const { status } = req.body.data;
  const validInput = ["booked", "seated", "finished", "cancelled"];
  if (!validInput.includes(status)) {
    next({
      status: 400,
      message: `Status ${status} is unknown`
    });
  }
  if (res.locals.reservation.status === "finished") {
    next({
      status: 400,
      message: `This reservation is finished`
    });
  }
  res.locals.status = status;
  next();
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.reservation })
}
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const reservation_date = req.query.date;
  const mobile = req.query.mobile_number;
  if (reservation_date) {
    const reservations = await service.list(reservation_date);
    res.json({ data: reservations });
  } else if (mobile) {
    const reservations = await service.search(mobile);
    res.json({ data: reservations });
  }
}

async function updateStatus(req, res) {
  const { reservation_id } = req.params;
  const updatedReservation = await service.updateStatus(reservation_id, res.locals.status);
  res.status(200).json({ data: updatedReservation });
}


module.exports = {
  create: [ hasValidInput, validReservationTime, asyncErrorBoundary(create) ],
  read: [ asyncErrorBoundary(reservationExists), asyncErrorBoundary(read) ],
  list: [ asyncErrorBoundary(list) ],
  updateStatus: [ asyncErrorBoundary(reservationExists), validStatus, asyncErrorBoundary(updateStatus) ],
};
