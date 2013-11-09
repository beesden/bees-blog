var mongoose = require('mongoose'),
	schemaServices = require('./services.js'),

	// Define DB schema
	dbSchema = new mongoose.Schema({
		_id: String
		email: String,
		username: String,
		password: String,
	});

// Attach static services and compile db model
module.exports = schemaServices(mongoose.connection, 'Author', dbSchema);
