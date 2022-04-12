const express = require("express");

const {
	httpSignup,
	httpSignin,
	httpSignout,
} = require("../models/users/users.controller");

const usersRouter = express.Router();

usersRouter.post("/signup", httpSignup);
usersRouter.post("/signin", httpSignin);
usersRouter.post("/signout", httpSignout);

module.exports = usersRouter;
