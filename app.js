var config = require('./config.js'),
    // Import modules
    express = require('express'),
	http = require('http'),
	app = express(),
	mongoose = require('mongoose'),
    // Import controllers
    article = require('./controller/article.js'),
    page = require('./controller/page.js');

// Configure Jade and resource directory
app.set('views', __dirname + '/view')
app.set('view engine', 'jade')
app.use(express.static('./assets'));

// Initialise DB connection
mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database);

// Start server after DB connect
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {

    // Assign url mappings to controllers
    app.all('/article/:name', function(req, res, next) {
    	console.log("Article request: " + req.url);
   		article.run(req, res, config);
    }); 
    app.all('/name', function(req, res, next) {
    	console.log("Page request: " + req.url);
       page.run(req, res, config);
    }); 
    app.all('/blog/:page?', function(req, res, next) {
    	console.log("Post list request: " + req.url);
       page.postlist(req, res, config);
    }); 
    app.all('/', function(req, res, next) {
    	console.log("Home page request: " + req.url);
		page.home(req, res, config);
    }); 
    app.get('*', function(req, res){
    	console.log("Page not found: " + req.url);
		page.error(req, res, config);
	});

    // Run HTTP server
    http.createServer(app).listen(config.port, function(){
        console.log('Server started listening on port ' + config.port);
    });
});