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
		if (base.authorize(req)) {
			console.info("Admin: View post list: " + req.url);
			postList(req, res, config);
		} else {
			base.login(req, res);
		}
	}); 
	app.get('/post/:name', function(req, res, next) {
		if (base.authorize(req)) {
			console.info("Admin: Create / edit post: " + req.url);
			postForm(req, res, config);
		} else {
			base.login(req, res);
		}
	});
	app.post('/post', function(req, res, next) {
		if (base.authorize(req)) {onsole.info("Admin: Create / edit post: " + req.url);
			update = new articleModel(req.body);
			// Set attributes if not already set
			update.name = update.name || update.heading.toLowerCase().replace(/ /g, '-');
			update.author = update.author || 'Beesden';
			// Save the object to the DB
			console.log(req.body._id);
			articleModel.where({ _id: req.body._id}).update(req.body, function() {
				res.redirect('/posts?update=true');
			});
		} else {
			base.login(req, res);
		}

	}); 
};