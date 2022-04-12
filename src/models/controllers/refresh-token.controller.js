require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../helpers/jwt.helper");
const users = require("../users/users.mongo");

async function handleRefreshToken(req, res, next) {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(401);
	const refreshToken = cookies.jwt;
	let foundUser;
	try {
		foundUser = await users.findOne({ token: refreshToken });
	} catch (err) {
		res.status(404).json({ message: "Token not found" });
	}
	if (!foundUser) return res.status(403).json({ message: "Access Denied!" });
	try {
		verifiedUser = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
		);
		if (foundUser.email !== verifiedUser.email)
			return res.status(403).json({ message: "Access Denied!" });
	} catch (err) {
		return res.status(403).json({ message: `Access Denied. ${err}` });
	}
	const accessToken = generateAccessToken(foundUser);
	const refToken = generateRefreshToken(foundUser);
	return res.status(200).json({ accessToken });
}

module.exports = { handleRefreshToken };
