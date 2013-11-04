var base = require("./base"),
	model = require('../model/article.js'),
	article,
	filters = {};

module.exports = { 
	name: "Page",
	content: null,
	run: function(req, res, config) {
		// Set article filters
		filters['status'] = 1;
		filters['name'] = req.params.name;
		// Get article from database
		model.getByName(filters, function(err, data) {
			if (data) {
				res.render('./article', {
					'article': data,
					'config': config,
					'title': data.heading,
					'url': require('./base.js').url(req)
				});
			} else {
				res.render('./404', {
					'config': config,
					'title': 'Page not Found',
					'url': require('./base.js').url(req)
				});
			}
		});
	}
};