var base = require("./base"),
	articleModel,
	filters;

module.exports = { 
	name: "Page",
	content: null,
	// Display error page
	error: function(req, res, config) {
		res.render('./404', {
			'config': config,
			'title': 'Page not Found',
			'url': require('./base.js').url(req)
		});	
	},
	// Display Home Page
	home: function(req, res, config) {
		// We may want to customise the home page later
		this.postlist(req, res, config)	
	},
	// Display blog feed
	postlist: function(req, res, config) {
		// Add article service
		articleModel = require('../model/article.js');
		// Add filters
		filters = {};
		filters['status'] = 1;
		if (req.query.author != null) {
			filters['author'] = req.query.author;
		}
		if (req.query.tag != null) {
			filters['tags'] = {$elemMatch: {'name': req.query.tag}};
		}
		// Get pagination of articles
		articleModel.countAll(filters, function(err, count) {
			var pagination = base.pagination(req, count);
			// Get article list
			articleModel.getPaged(pagination, filters, function(err, articles) {
				res.render('./home', {
					'articles': base.rowDivide(articles, 2), 
					'config': config,
					'pagination': pagination,
					'title': 'Home',
					'url': require('./base.js').url(req)
				});
			});
		});		
	},
	// Display content page from DB
	run: function(req, res, config) {
		res.render('./page');
	}
};