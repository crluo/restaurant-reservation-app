const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

async function create(req, res) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

async function list(req, res) {
  const tables = await service.list();
  res.json({ data: tables });
}

module.exports = {
  create: [ hasValidInput, asyncErrorBoundary(create) ],
  list,
};