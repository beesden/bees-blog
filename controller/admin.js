var base = require("./base"),
	posts = require('./adminPost.js'),

	// Display blog feed
	dashboard = function(req, res, config) {
		base.admin(req, res, config, null, './layout');
	};

// Assign url mappings to control functions
module.exports = function(app, config) { 

	posts(app, config);

	/* Other admin pages */
	app.get('/logout', function(req, res){
		console.info("User logging out: " + req.body.username);
		req.session.destroy();
		res.redirect('/login?logout=true');
	});
	app.post('/login', function(req, res){
		console.info("User attempting to login: " + req.body.username);
		base.authorize(req, res, function() {
			res.redirect(req.session.loginDir ? req.session.loginDir : '/');
		}, function() {
			res.redirect('/login?error=true');
		});
	});
	app.get('/login', function(req, res){
		console.info("Admin: Login page: " + req.url);
		base.authorize(req, res, function() {
			res.redirect(req.session.loginDir ? req.session.loginDir : '/');
		});
	});
	app.all('/', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: Dashboard " + req.url);
			base.admin(req, res, config, null, './layout');
		});
	}); 
	app.get('*', function(req, res){
		console.info("Admin: unknown page: " + req.url);
		res.redirect('/');
	});
};