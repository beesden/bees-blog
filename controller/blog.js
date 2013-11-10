var base = require("./base"),
	articleModel = require('../model/article.js'),
	pageModel = require('../model/page.js'),
	filters,

	// Display article from DB
	article = function(req, res, config) {
		filters = {status: 1, name: req.params.name};
		articleModel.getByName(filters, function(err, article) {
			data = {article: article};
			base.layout(req, res, config, data, './article', article.heading);
		})		
	},
	// Display error page
	error = function(req, res, config) {
		base.layout(req, res, config, data, './404', 'Page not Found');
	},
	// Submit Contact Us form
	enquirySend = function(req, res, config) {
		// Quick validation of contact form
		if (req.body.name && req.body.email && req.body.message) {
			base.sendMail(req.body.email, config.company.email, 'Blog enuiry from ' + req.body.name, req.body.message);
			res.redirect('/confirmation');
		} else {
			res.redirect('/contact?error=true');
		}		
	},
	// Display Home Page
	home = function(req, res, config) {
		// We may want to customise the home page later
		postlist(req, res, config)	
	},
	// Display blog feed
	postlist = function(req, res, config) {
		// Add filters
		filters = {status: 1};
		if (req.query.author != null) {
			filters['author'] = req.query.author;
		}
		if (req.query.tag != null) {
			filters['tags'] = {$elemMatch: {'name': req.query.tag}};
		}
		// Get pagination of articles
		articleModel.countAll(filters, function(err, count) {
			var pagination = base.pagination(req, count, 8);
			// Get article list
			articleModel.getPaged(pagination, filters, function(err, articles) {
				data = {articles: base.rowDivide(articles, 2), pagination: pagination};
				base.layout(req, res, config, data, './home', 'Home');
			});
		});		
	},
	// Display content page from DB
	run = function(req, res, config) {
		filters = {name: req.params.name};
		pageModel.getByName(filters, function(err, page) {
			data = {page: page};
			base.layout(req, res, config, data, './page', page.heading);
		})		
	};

// Assign url mappings to control functions
module.exports = function(app, config) { 
	app.all('/article/:name', function(req, res, next) {
		console.info("Article request: " + req.url);
		article(req, res, config);
	}); 
	app.all('/blog/:page?', function(req, res, next) {
		console.info("Post list request: " + req.url);
		postlist(req, res, config);
	});
	app.post('/contact', function(req, res, next) {
		console.info("Contact us page: " + req.url);
		enquirySend(req, res, config);
	}); 
	app.all('/:name', function(req, res, next) {
		console.info("Page request: " + req.url);
		run(req, res, config);
	}); 
	app.all('/', function(req, res, next) {
		console.info("Home page request: " + req.url);
		home(req, res, config);
	}); 
	app.get('*', function(req, res){
		console.info("Page not found: " + req.url);
		error(req, res, config);
	});
};