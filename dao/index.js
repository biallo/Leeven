var DaoBase = require('./DaoBase'),
    _ = require('underscore'),
    fs = require('fs-extra'),
    path = require('path'),
    models = require('./../models');

for (key in models) {
    if (fs.existsSync(path.join(__dirname, key + 'Dao.js'))) {
        exports[key + 'Dao'] = _.extend(DaoBase.getInstance(models[key]), require(path.join(__dirname, key + 'Dao')));
    } else {
        exports[key + 'Dao'] = DaoBase.getInstance(models[key]);
    }
}
