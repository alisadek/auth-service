const express = require("express");
const { handleRefreshToken } = require("../models/users/token.controller");

const tokenRouter = express.Router();

tokenRouter.get("/", handleRefreshToken);

module.exports = tokenRouter;
