const users = require("./users.mongo");
const HttpError = require("../error/http-error.model");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

async function userExists({ email }) {
	try {
		return await users.findOne({ email });
	} catch (err) {
		throw new Error("Signup failed, please try again");
	}
}

async function assignRolesToUser(email, newRoles) {
	try {
		await users.updateOne(
			{ email },
			{ roles: { ...newRoles, User: 2022 } },
		);
		return await users.findOne({ email });
	} catch (error) {
		res.sendStatus(500);
	}
}

async function signup({ name, email, password }) {
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const createdUser = await users.create({
			name,
			email: email.toLowerCase(),
			roles: { User: 2022 },
			image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
			password: hashedPassword,
		});
		return await createdUser.save();
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

async function saveRefreshTokenToUser(foundUser, refreshToken) {
	try {
		const currentUser = await users.updateOne(
			{ email: foundUser.email },
			{ token: refreshToken },
		);
	} catch (err) {
		throw new Error("failed to update token");
	}
}

module.exports = {
	signup,
	userExists,
	signin,
	saveRefreshTokenToUser,
	assignRolesToUser,
};
