var mongoose = require('mongoose'),
	schemaServices = require('./services.js'),

	// Define DB schema
	dbSchema = new mongoose.Schema({
		name: String,
		heading: String,
		author: String,
		publishDate: Date,
		summary: String,
		description: String,
		status: Number,
		tags: [{
			name: String
		}]
	});

// Attach static services and compile db model
module.exports = schemaServices(mongoose.connection, 'article', dbSchema);
