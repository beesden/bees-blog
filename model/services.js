var model = function(db, dbTable, dbSchema) {
	// Count all records
	dbSchema.statics.countAll = function (filters, callback) {
		return this.count(filters, callback);
	};
	// Fetch all records
	dbSchema.statics.getAll = function (filters, callback) {
		return this.find(filters, callback);
	};
	// Fetch limited records
	dbSchema.statics.getLimit = function (limit, sort, filters, callback) { 
		return this.find(filters).sort([sort]).limit(limit).exec('find', callback);
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