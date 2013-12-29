var base = require("./base"),
	pageModel = require('../model/page.js'),
	update,

	pageForm = function(req, res, config) {
		pageModel.getByName({name: req.params.name}, function(err, page) {
			data = {page: page ? page : new pageModel};
			base.admin(req, res, config, data, './pageForm');
		})	
	},
	pageList = function(req, res, config) {
		filters = base.getFilters(req);
		// Get pagination of pages
		pageModel.countAll(filters, function(err, count) {
			var pagination = base.pagination(req, count, 15);
			// Get page list
			pageModel.getPaged(pagination, filters, function(err, pages) {
				data = {pages: pages, pagination: pagination};
				base.admin(req, res, config, data, './pageList');
			});
		});		
	}

// Assign url mappings to control functions
module.exports = function(app, config) { 

	/* Blog page config */
	app.all('/pages/:page?', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: View page list: " + req.url);
			pageList(req, res, config);
		});
	}); 
	app.get('/page/:name', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: Create / edit page: " + req.url);
			pageForm(req, res, config);
		});
	});
	app.post('/page', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: Create / edit page: " + req.url);
			// Set attributes if not already set
			req.body.name = req.body.name || update.heading.toLowerCase().replace(/ /g, '-');
			// Save the object to the DB
			pageModel.where({_id: req.body._id}).update({$set: req.body}, function() {
				res.redirect('/pages?update=true');
			});
		});
	}); 
};