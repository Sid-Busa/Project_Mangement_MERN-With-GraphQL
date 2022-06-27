const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Name must be required'],
	},
	description: {
		type: String,
		trim: true,
		required: [true, 'Name must be required'],
	},
	status: {
		type: String,
		enum: ['Not Selected', 'In Progress', 'Completed'],
	},
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
	},
});

module.exports = mongoose.model('Project', ProjectSchema);
