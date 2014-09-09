var mongoose = require('mongoose');
var fs = require('fs');

var models_path = __dirname + '/../models/sub';

fs.readdirSync(models_path).forEach(function(file) {
	if (file !== '.DS_Store' && file.indexOf('.') !== 0) {
		require(models_path + '/' + file);
		var modelName = file.replace('Model.js', '');
		exports[modelName] = mongoose.model(modelName);
	}
});