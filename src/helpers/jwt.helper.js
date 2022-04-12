const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
	return jwt.sign(
		{ id: user.id, email: user.email },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "20s",
		},
	);
}
function generateRefreshToken(user) {
	return jwt.sign(
		{ id: user.id, email: user.email },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "1y",
		},
	);
}

module.exports = { generateAccessToken, generateRefreshToken };
