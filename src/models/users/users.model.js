const users = require("./users.mongo");
const HttpError = require("../error/http-error.model");
const bcrypt = require("bcrypt");

async function userExists({ email }) {
	try {
		return await users.findOne({ email });
	} catch (err) {
		throw new Error("Signup failed, please try again");
	}
}

async function signup({ name, email, password }) {
	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 10);
	} catch {
		throw new Error("Failed to signup");
	}
	const createdUser = users.create({
		name,
		email,
		image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
		password: hashedPassword,
	});

	try {
		await createdUser.save();
	} catch (err) {
		throw new Error("Signing Up failed, please try again.");
	}
}
async function signin({ email, password }) {
	const user = await userExists({ email });
	if (!user) {
		throw new Error("Cannot find user");
	}
	try {
		if (await bcrypt.compare(password, user.password)) {
			return user;
		}
		return false;
	} catch {
		throw new Error("Error logging in!");
	}
}
module.exports = { signup, userExists, signin };
