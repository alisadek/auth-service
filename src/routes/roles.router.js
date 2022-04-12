const express = require("express");
const ROLES_LIST = require("../config/roles.config");
const authenticateRoles = require("../middleware/auth-roles.middleware");
const { httpAssignRolesToUser } = require("../models/users/roles.controller");

const rolesRouter = express.Router();

rolesRouter.put(
	"/",
	authenticateRoles(ROLES_LIST.Admin),
	httpAssignRolesToUser,
);

module.exports = rolesRouter;
