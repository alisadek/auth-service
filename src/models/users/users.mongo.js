const mongoose = require("mongoose");
const uniqueValidaotr = require("mongoose-unique-validator");

const usersSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	image: { type: String, require: true },
	token: { type: String },
	roles: {
		Admin: Number,
		Editor: Number,
		User: { type: Number, default: 2022 },
	},
});

// usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", usersSchema);
