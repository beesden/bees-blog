var base = require("./base"),
	pages = require('./adminPage.js'),
	posts = require('./adminPost.js'),
	users = require('./adminUser.js'),
	admin = require('./adminDefault.js');	

// Assign url mappings to control functions
module.exports = function(app, config) { 

	// Initiate admin sections
	pages(app, config);
	posts(app, config);
	users(app, config);

	// Other admin pages
	admin(app, config);
};