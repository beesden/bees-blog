var base = require("./base"),
	articleModel = require('../model/article.js'),
	update,

	postForm = function(req, res, config) {
		articleModel.getByName({name: req.params.name}, function(err, article) {
			data = {article: article ? article : new articleModel};
			base.admin(req, res, config, data, './postForm');
		})	
	},
	postList = function(req, res, config) {
		filters = base.getFilters(req);
		// Get pagination of articles
		articleModel.countAll(filters, function(err, count) {
			var pagination = base.pagination(req, count, 15);
			// Get article list
			articleModel.getPaged(pagination, filters, function(err, articles) {
				data = {articles: articles, pagination: pagination};
				base.admin(req, res, config, data, './postList');
			});
		});		
	}

// Assign url mappings to control functions
module.exports = function(app, config) { 

	/* Blog post config */
	app.all('/posts/:page?', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: View post list: " + req.url);
			postList(req, res, config);
		});
	}); 
	app.get('/post/:name', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: Create / edit post: " + req.url);
			postForm(req, res, config);
		});
	});
	app.post('/post', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: Create / edit post: " + req.url);
			update = new articleModel(req.body);
			// Set attributes if not already set
			req.body.name = req.body.name || req.body.heading.toLowerCase().replace(/ /g, '-');
			req.body.author = req.body.author || req.session.userAuth.name;
			// Save the object to the DB
			articleModel.where({_id: req.body._id}).update({$set: req.body}, function() {
				res.redirect('/posts?update=true');
			});
		});
	}); 
};