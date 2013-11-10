module.exports = {

	// Blog server config
	admin: {
		port: 2001
	},

	// Blog server config
	blog: {
		port: 2000
	},

	// Site Information
	company: {
		name: 'Sample Blog',
		email: 'beesden@gmail.com',
		site: 'Beesden Blog'
	},

	// Email config
	email: {
		host: "smtp.gmail.com",
		secureConnection: true, 
		port: 465,
		auth: {
			user: "email@gmail.com",
			pass: "password"
		}
	},

	// Mongo configuration
	mongo: {
		host: '127.0.0.1',
		port: 27017,
		database: 'bees_blog' 
	}
}