const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const isAuth = require("./middleware/is-auth.middleware");
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));

app.use(express.json());
app.use("/api/user", usersRouter);
app.use("/api/posts", isAuth, postsRouter);
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
