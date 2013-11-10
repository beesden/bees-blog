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
		if (base.authorize(req)) {
			console.log(base.authorize(req));
			dashboard();
		} else {
			res.redirect('/login?error=true');
		};
	});
	app.get('/login', function(req, res){
		console.info("Admin: Login page: " + req.url);
		if (base.authorize(req, res, config)) {
			res.redirect('/');
		} else {
			base.login(req, res);
		};
	});
	app.all('/', function(req, res, next) {
		if (base.authorize(req)) {
			console.info("Admin: Dashboard " + req.url);
			base.admin(req, res, config, null, './layout');
		} else {
			base.login(req, res);
		}
	}); 
	app.get('*', function(req, res){
		console.info("Admin: unknown page: " + req.url);
		res.redirect('/');
	});
};