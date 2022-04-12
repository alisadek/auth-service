const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
	const roles = Object.values(user.roles);
	return jwt.sign(
		{
			UserInfo: {
				id: user.id,
				email: user.email,
				roles,
			},
		},
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
