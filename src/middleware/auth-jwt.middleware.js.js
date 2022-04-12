const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
	const authHeader =
		req.headers["authorization"] || req.headers["Authorization"];
	if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
	const token = authHeader && authHeader.split(" ")[1];
	if (!token)
		return res
			.status(401)
			.json({ message: "Access Denied" })
			.redirect("/api/user/signin");

	try {
		const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.user = verifiedUser.UserInfo.email;
		req.roles = verifiedUser.UserInfo.roles;
		console.log("Request Roles: ", req.roles, "Request User: ", req.user);
		if (!verifiedUser) return res.status(403);
	} catch (err) {
		return res.status(403).json({ message: "Invalid token" });
	}
	next();
}

module.exports = {
	authenticateToken,
};
