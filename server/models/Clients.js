const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClientSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Name must be required'],
	},
	email: {
		lowercase: true,
		unique: true,
		type: String,
		trim: true,
		required: 'Email address is required',
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},
	phone: {
		type: String,
		trim: true,
		required: [true, 'Name must be required'],
	},
});

module.exports = mongoose.model('Client', ClientSchema);
