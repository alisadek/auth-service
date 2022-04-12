const posts = [
	{ id: 1, author: "Ali", message: "This is the first post" },
	{ id: 2, author: "Mohamed", message: "This is the second post" },
	{ id: 3, author: "Ahmed", message: "This is the third post" },
];
let currentId = 3;
function getAllPosts() {
	return posts;
}
function createPost({ author, message }) {
	currentId++;
	const newPost = { id: currentId, author, message };
	posts.push(newPost);
	return newPost;
}

module.exports = { getAllPosts, createPost };
