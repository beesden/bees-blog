var config = require('./config.js'),
	// Import modules
	express = require('express'),
	http = require('http'),
	app = express(),
	mongoose = require('mongoose'),
	// Import controllers
	blogController = require('./controller/blog.js')

// Configure Jade and resource directory
app.set('views', __dirname + '/view')
app.set('view engine', 'jade');
app.use(express.favicon("assets/favicon.ico"));
app.use(express.static('./assets'));
// Allow post data for express
app.use(express.json());
app.use(express.urlencoded());

// Initialise DB connection
mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database);

// Start server after DB connect
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {

	// Initiate controllers
	blogController(app, config);

	// Run HTTP server
	http.createServer(app).listen(config.blog.port, function(){
		console.info('Server started listening on port ' + config.blog.port);
	});
});