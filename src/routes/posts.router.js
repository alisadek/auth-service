const express = require("express");
const ROLES_LIST = require("../config/roles.config");
const { authenticateToken } = require("../middleware/auth-jwt.middleware.js");
const authenticateRoles = require("../middleware/auth-roles.middleware");
const {
	httpGetAllPosts,
	httpCreatePost,
} = require("../models/posts/posts.controller");

const postsRouter = express.Router();

postsRouter
	.route("/")
	.get(httpGetAllPosts)
	.post(
		authenticateRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
		httpCreatePost,
	);
module.exports = postsRouter;
