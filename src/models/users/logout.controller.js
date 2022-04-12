const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../helpers/jwt.helper");
const users = require("./users.mongo");

async function handleLogout(req, res, next) {
	//Access token should also be deleted from client-side
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);
	const refreshToken = cookies.jwt;
	let foundUser;
	try {
		foundUser = await users.findOne({ token: refreshToken });
	} catch (err) {
		res.status(404).json({ message: "Token not found" });
	}
	if (!foundUser) {
		res.clearCookie("jwt", { httpOnly: true });
		return res.sendStatus(204);
	}

	//Delete Refresh token from Mongo
	try {
		await users.update({ email: foundUser.email }, { token: "" });
	} catch (err) {
		res.sendStatus(403);
	}
	res.clearCookie("jwt", { httpOnly: true });
	res.sendStatus(204);
}

module.exports = { handleLogout };
