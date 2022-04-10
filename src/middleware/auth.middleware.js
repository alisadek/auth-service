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
	if (!token) return res.status(401).json({ message: "No token sent" });
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ message: "Invalid token" });
		req.user = user;
		next();
	});
}

// function generateAccessToken(user) {}

module.exports = {
	isAuth,
	authenticateToken,
};
