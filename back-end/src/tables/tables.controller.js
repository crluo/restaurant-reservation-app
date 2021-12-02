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
  if (!input.table_name || input.table_name.length <= 1) {
    next({
      status: 400,
      message: "table_name is invalid",
    })
  }
  if (!input.capacity || input.capacity < 1 || typeof input.capacity !== "number") {
    next({
      status: 400,
      message: "capacity is invalid",
    })
  }
  next();
}
async function create(req, res) {
    const newTable = await service.create(req.body.data);
    res.status(201).json({ data: newTable });
}
module.exports = {
  create: [ hasValidInput, asyncErrorBoundary(create) ],
};