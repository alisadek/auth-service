const { assignRolesToUser, saveRefreshTokenToUser } = require("./users.model");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../helpers/jwt.helper");

async function httpAssignRolesToUser(req, res) {
	const { email, roles: newRoles } = req.body;

	if (!email || !newRoles) {
		return res
			.status(400)
			.json({ error: "Missing required user property" });
	}
	const modifiedUser = await assignRolesToUser(email, newRoles);
	console.log(modifiedUser);
	const accessToken = generateAccessToken(modifiedUser);

	const refreshToken = generateRefreshToken(modifiedUser);

	saveRefreshTokenToUser(modifiedUser, refreshToken);

	return res
		.status(200)
		.cookie("jwt", refreshToken, {
			httpOnly: true,
			maxAge: 25 * 60 * 60 * 1000,
		})
		.json({ accessToken });
}

module.exports = { httpAssignRolesToUser };
