var base = require("./base"),
	userModel = require('../model/user.js'),
	update,

	postForm = function(req, res, config) {
		userModel.getByName({name: req.params.name}, function(err, user) {
			data = {user: user ? user : new userModel};
			base.admin(req, res, config, data, './userForm');
		})	
	},
	postList = function(req, res, config) {
		filters = base.getFilters(req);
		// Get pagination of users
		userModel.countAll(filters, function(err, count) {
			var pagination = base.pagination(req, count, 15);
			// Get user list
			userModel.getPaged(pagination, filters, function(err, users) {
				data = {users: users, pagination: pagination};
				base.admin(req, res, config, data, './userList');
			});
		});		
	}

// Assign url mappings to control functions
module.exports = function(app, config) { 

	/* Admin user config */
	app.all('/users/:user?', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: View user list: " + req.url);
			postList(req, res, config);
		});
	}); 
	app.get('/user/:name', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: Create / edit user: " + req.url);
			postForm(req, res, config);
		});
	});
	app.post('/user', function(req, res, next) {
		base.authorize(req, res, function() {
			console.info("Admin: Create / edit user: " + req.url);
			// Save the object to the DB
			userModel.where({_id: req.body._id}).update({$set: req.body}, function() {
				res.redirect('/users?update=true');
			});
		});
	}); 
};