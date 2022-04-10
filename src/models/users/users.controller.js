const { signup, userExists, signin } = require("./users.model");
const jwt = require("jsonwebtoken");

async function httpSignup(req, res) {
	const user = req.body;
	if (!user.name || !user.email || !user.password) {
		return res
			.status(400)
			.json({ error: "Missing required user property" });
	}
	const existingUser = await userExists(user);
	if (existingUser) {
		return res
			.status(400)
			.json({ error: "User already exists! Try signing in." });
	}
	await signup(user);
	return res.status(201).json(user);
}

async function httpSignin(req, res) {
	const user = req.body;
	if (!user.email || !user.password) {
		return res
			.status(400)
			.json({ error: "Missing required user property" });
	}
	const signedInUser = await signin(user);

	const accessToken = generateAccessToken(signedInUser);
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
	if (signedInUser) {
		return res.status(200).json({ accessToken, refreshToken });
	}
	return res.status(500).json({ error: "failed to login" });
}

function generateAccessToken(user) {
	return jwt.sign({ uid: user.id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15s",
	});
}

module.exports = { httpSignup, httpSignin };
