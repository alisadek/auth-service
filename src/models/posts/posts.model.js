const posts = [
	{ id: "1", author: "Ali", message: "This is the first post" },
	{ id: "2", author: "Mohamed", message: "This is the second post" },
	{ id: "3", author: "Ahmed", message: "This is the third post" },
];

function getAllPosts() {
	return posts;
}

module.exports = { getAllPosts };
