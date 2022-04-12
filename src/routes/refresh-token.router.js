const express = require("express");
const {
	handleRefreshToken,
} = require("../models/controllers/refresh-token.controller");

const tokenRouter = express.Router();

tokenRouter.get("/", handleRefreshToken);

module.exports = tokenRouter;
