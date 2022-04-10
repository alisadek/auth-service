const mongoose = require("mongoose");
const uniqueValidaotr = require("mongoose-unique-validator");

const usersSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	image: { type: String, require: true },
});

// usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", usersSchema);
