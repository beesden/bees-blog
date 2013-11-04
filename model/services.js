var model = function(db, dbTable, dbSchema) {

	// Count all records
	dbSchema.statics.countAll = function (filters, callback) {
		return this.count(filters, callback);
	};

	// Fetch all records
	dbSchema.static.getAll = function (filters, callback) {
		return this.find(filters, callback);
	};

	// Fetch paged records
	dbSchema.statics.getPaged = function (pagination, filters, callback) { 
		return this.find(filters).skip(pagination.firstIndex - 1).limit(pagination.results).exec('find', callback);
	};
	
	// Fetch single record
	dbSchema.statics.getByName = function (filters, callback) {
		return this.findOne(filters, callback);
	};

	return db.model(dbTable, dbSchema);

}

// Return value of model
module.exports = model;