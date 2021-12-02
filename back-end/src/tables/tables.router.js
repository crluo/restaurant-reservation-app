/**
 * Defines the router for tables resources.
 *
 * @type {Router}
 */

 const router = require("express").Router();
 const controller = require("./tables.controller");
 const notFound = require("../errors/notFound")
 
 router.route("/")
    .post(controller.create)
    .all(notFound);
 
 module.exports = router; 