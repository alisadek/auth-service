function isAuth(req, res, next) {
	if (!req.session.isLoggedIn) {
		return res.redirect("/api/user/signin");
	}
}

// function hasRole(req,res,next){
//   switch (req.session.role) {
//     case "admin":

//       break;

//     default:
//       break;
//   }
// }

module.exports = isAuth;
