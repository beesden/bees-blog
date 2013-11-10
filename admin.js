module.exports = function(config) {
	// Import modules
	var express = require('express'),
		app = express(),
		controller = require('./controller/blog.js')	

	// Configure Jade and resource directory
	app.set('views', __dirname + '/view/admin')
	app.set('view engine', 'jade');
	app.use(express.favicon("assets/favicon.ico"));
	app.use(express.static('./assets'));
	// Allow post data for express
	app.use(express.json());
	app.use(express.urlencoded());

	controller(app, config);

	return app
}