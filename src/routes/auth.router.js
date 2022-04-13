const express = require("express");

const {
	httpSignup,
	httpSignin,
	httpSignout,
} = require("../models/users/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", httpSignup);
authRouter.post("/signin", httpSignin);
authRouter.post("/signout", httpSignout);

module.exports = authRouter;
