const mongoose = require('mongoose');
const URL = process.env.MONGO_URI;

const connectionDB = async () => {
	try {
		await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to mongoDB');
	} catch (error) {
		console.log('Error', error.message);
	}
};

module.exports = connectionDB;
