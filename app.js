var config = require('./config.js'),
	// Import server modules
	http = require('http'),
	mongoose = require('mongoose'),
	// Server configurations
	server = require('./server.js');

// Initialise DB connection
mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database);

// Start server after DB connect
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {

	// Run admin server
	http.createServer(server(config, 'admin')).listen(config.admin.port, function(){
		console.info('Admin started listening on port ' + config.admin.port);
	});

	// Run blog server
	http.createServer(server(config, 'blog')).listen(config.blog.port, function(){
		console.info('Blog started listening on port ' + config.blog.port);
	});
});