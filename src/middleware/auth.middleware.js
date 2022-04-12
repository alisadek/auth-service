const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
	if (!req.session.isLoggedIn) {
		return res.redirect("/api/user/signin");
	}
	next();
}
function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token)
		return res
			.status(401)
			.json({ message: "Access Denied" })
			.redirect("/api/user/signin");

	try {
		const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.user = verifiedUser;
		if (!verifiedUser) return res.status(403);
	} catch (err) {
		return res.status(403).json({ message: "Invalid token" });
	}
	next();
}

function authRole(role) {
	return (req, res, next) => {
		try {
			const authHeader = req.headers["authorization"];
			const token = authHeader && authHeader.split(" ")[1];
			if (!token) {
				return res.status(403).json("Authorization failed!");
			}
		} catch {
			return next(error);
		}
	};
}

// function generateAccessToken(user) {}

module.exports = {
	isAuth,
	authenticateToken,
};
