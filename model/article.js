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
			name: String,
			heading: String
		}]
	});

// Fetch all tags only
dbSchema.statics.getTags = function (filters, callback) { 
	return this.distinct('tags.name', callback);
};	

// Attach static services and compile db model
module.exports = schemaServices(mongoose.connection, 'Article', dbSchema);
