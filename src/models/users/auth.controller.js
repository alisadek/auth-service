const {
	signup,
	userExists,
	signin,
	saveRefreshTokenToUser,
} = require("./users.model");
const jwt = require("jsonwebtoken");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../helpers/jwt.helper");

async function httpSignup(req, res, next) {
	const user = req.body;

	//Input Validation
	try {
		if (!user.name || !user.email || !user.password) {
			return res
				.status(400)
				.json({ error: "Missing required user property" });
		}
		//Existing user check
		const existingUser = await userExists(user);

		if (existingUser) {
			return res
				.status(409)
				.json({ error: "User already exists! Try signing in." });
		}

		const newUser = await signup(user);
		const accessToken = generateAccessToken(newUser);
		const refreshToken = generateRefreshToken(newUser);
		saveRefreshTokenToUser(newUser, refreshToken);
		return res
			.status(200)
			.cookie("jwt", refreshToken, {
				httpOnly: true,
				maxAge: 25 * 60 * 60 * 1000,
			})
			.json({ accessToken });
	} catch (error) {
		next(error);
	}
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

	const refreshToken = generateRefreshToken(signedInUser);

	saveRefreshTokenToUser(signedInUser, refreshToken);

	return res
		.status(200)
		.cookie("jwt", refreshToken, {
			httpOnly: true,
			maxAge: 25 * 60 * 60 * 1000,
		})
		.json({ accessToken });
}

function httpSignout(req, res) {
	jwt.signout(req, res, false);
}

module.exports = { httpSignup, httpSignin, httpSignout };
