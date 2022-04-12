const express = require("express");
const { handleLogout } = require("../models/users/logout.controller");

const logoutRouter = express.Router();

logoutRouter.get("/", handleLogout);

module.exports = logoutRouter;
