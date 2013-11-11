module.exports = function(config, server) {

	// Import modules
	var express = require('express'),
		app = express(),
		controller = require('./controller/' + server + '.js')	

	// Configure Jade and resource directory
	app.set('views', __dirname + '/view/' + server)
	app.set('view engine', 'jade');
	app.use(express.favicon('assets/favicon-' + server + '.ico'));
	app.use(express.static('./assets'));
	app.use(express.cookieParser());
	app.use(express.session({secret: '5E1J9d2Qf564Z92'}));

	// Allow post data for express
	app.use(express.json());
	app.use(express.urlencoded());

	controller(app, config);

	return app
}