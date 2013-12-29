var base = require("./base"),
	articleModel = require('../model/article.js'),
	pageModel = require('../model/page.js'),
	userModel = require('../model/user.js'),
	async = require('async'),

	dashboard = function(req, res, config) {
		data = {};			
		// Get dashboard data	
		async.parallel([	
			// Get all published articles	
			function(callback) {
				articleModel.getAll({status: 1}, function(err, articles) {
					data.pubArticles = articles;
					callback();
				})
			},	
			// Get total articles	
			function(callback) {
				articleModel.count({}, function(err, articles) {
					data.articles = articles;
					callback();
				})
			},
			// Get all pages		
			function(callback) {
				pageModel.getAll({}, function(err, pages) {
					data.pages = pages;
					callback();
				})
			},		
			// Get all users
			function(callback) {
				userModel.getAll({}, function(err, users) {
					data.users = users;
					callback();
				})
			}
		], 
		function (error, results) {
			require('./base').admin(req, res, config, data, './dashboard');
		});
	}

// Assign url mappings to control functions
module.exports = function(app, config) { 	

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
			dashboard(req, res, config);
		});
	}); 
	app.get('*', function(req, res){
		console.info("Admin: unknown page: " + req.url);
		res.redirect('/');
	});
};