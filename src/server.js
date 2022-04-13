require("dotenv").config();

const http = require("http");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("./app");

const PORT = process.env.PORT || 5000;

const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
	console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
	console.error(err);
});

async function startServer() {
	await mongoose.connect(MONGO_URL);
	server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

startServer();
