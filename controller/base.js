module.exports = {
	name: "base",
	rowDivide: function(items, columns) {

		// Split {items} into sections, {columns} per sections
    	return items.reduce(function (prev, item, i) {
	        if(i % columns === 0)
	            prev.push([item]);
	        else
	            prev[prev.length - 1].push(item);

	        return prev;
	    }, []);
	},
	pagination: function(req, count, status, baseUrl) {	
			
		var showPages = 1,
			// Check query params for page & result and calculate max pages
			page = req.query.page ? isNaN(req.query.page) : isNaN(req.params.page) ? 1 : req.params.page,
			results = req.query.results ? isNaN(req.query.results) : 8,
			pages = Math.ceil(count / results);	

		// Make sure the parameters are numbers 	

		// Set first and last result indexes
		var firstIndex = (page - 1) * results + 1,
			lastIndex = firstIndex + results - 1;

		// Set first and last page
		var first = (pages - page) > showPages ? page - showPages : pages - (2 * showPages);
		first = first < 1 ? 1 : first;
		var last = page <= showPages ? (2 * showPages + 2) - first : page + showPages; 
		last = last > pages ? pages : last;

		return {
			'page': page,
			'results': results,
			'firstIndex': firstIndex,
			'lastIndex': lastIndex > count ? count : lastIndex,			
			'firstPage': first,
			'lastPage': last,	
			'nextPage': page + 1,	
			'prevPage': page - 1,			
			'totalPages': pages,
			'totalResults': count
		}
	},
	url: function(req) {

		// Retrieve the base url and function to update params
		var baseUrl = req.url.split('?')[0].replace(/\/(blog\/[^\/]+)?/, '/blog/'),
			baseQuery = function(key, value) {
				var params = req.url.indexOf('?') > -1 ? req.url.split('?')[1] : '',
					regex = new RegExp('[?&]' + key + '=([^&]*)');
				// Remove existing key from query
				if (params.length && key.length) {
					params = '?' + params;
					params = params.replace(regex, '');
				}
				// Return existing + key + value
				return params + (params.length ? '&' : '?') + key + '=' + value;
			}

		return {
			'path': baseUrl,			
			'query': baseQuery,			
		}
	}
}