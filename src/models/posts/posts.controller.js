const getAllPosts = require("./posts.model");

function httpGetAllPosts() {
	return getAllPosts();
}

module.exports = { httpGetAllPosts };
