var mongoose = require('mongoose'),
	schemaServices = require('./services.js'),

	// Define DB schema
	dbSchema = new mongoose.Schema({
		name: String,
		title: String,
		heading: String,
		content: String,
		pageOrder: Number
	});

// Attach static services and compile db model
module.exports = schemaServices(mongoose.connection, 'page', dbSchema);
