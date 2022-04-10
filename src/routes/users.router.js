const express = require("express");

const { httpSignup, httpSignin } = require("../models/users/users.controller");

const usersRouter = express.Router();

usersRouter.post("/signup", httpSignup);
usersRouter.post("/signin", httpSignin);

module.exports = usersRouter;
