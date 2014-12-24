var fs = require('fs');

var routes_path = __dirname + '/../routes'

module.exports = function(app, auth) {
    fs.readdirSync(routes_path).forEach(function(file) {
        if (file.indexOf('.') > 0) {
    		require(routes_path + '/' + file)(app, auth);
    	}
    });
}