const { getAllPosts } = require("./posts.model");

function httpGetAllPosts(req, res, next) {
	const posts = getAllPosts();
	return res.status(200).json({ posts });
}

module.exports = { httpGetAllPosts };
