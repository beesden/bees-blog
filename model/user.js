var mongoose = require('mongoose'),
	schemaServices = require('./services.js'),

	// Define DB schema
	dbSchema = new mongoose.Schema({
		email: String,
		name: String,
		username: String,
		password: String,
	});

// Attach static services and compile db model
module.exports = schemaServices(mongoose.connection, 'user', dbSchema);
