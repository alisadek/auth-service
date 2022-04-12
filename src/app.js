const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { authenticateToken } = require("./middleware/auth-jwt.middleware.js.js");
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");
const logoutRouter = require("./routes/logout.router");
const tokenRouter = require("./routes/token.router");
const rolesRouter = require("./routes/roles.router");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/user", usersRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/token", tokenRouter);
app.use("/api/logout", logoutRouter);

app.use("/api/posts", authenticateToken, postsRouter);
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "An unknown error occurred!" });
});
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
