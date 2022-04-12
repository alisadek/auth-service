const { getAllPosts, createPost } = require("./posts.model");

function httpGetAllPosts(req, res, next) {
	const posts = getAllPosts();
	return res.status(200).json({ posts });
}
function httpCreatePost(req, res, next) {
	if (!req.body.message || !req.body.author)
		return res.status(400).json({ message: "Missing properties" });
	const newPost = createPost(req.body);
	return res.status(200).json({ newPost });
}

module.exports = { httpGetAllPosts, httpCreatePost };
