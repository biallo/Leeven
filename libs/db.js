var mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs-extra');

/**
 *  exports `db`
 */
exports.connect = function(dbConfig, callback) {

    dbHost = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.name;
    //init connection
    var db = mongoose.connect(dbHost);

    //connection in 'close'
    mongoose.connection.on('close', function(str) {
        console.error("DB disconnected: " + str);
    });

    //connection in 'error'
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    //connection in 'open'
    mongoose.connection.once('open', function() {

        console.log('[Succeed] DB connected %s', dbHost);
        callback(mongoose);
    });

}

exports.dropDatabase = function(db, callback) {

    db.dropDatabase();
    callback();
}

exports.removeDatabase = function(collectionName, callback) {
    mongoose.model(collectionName).remove(function() {
        callback();
    })
}

exports.requireModels = function(modelFolder) {
    for (var i = 0; i < modelFolder.length; i++) {
        fs.readdirSync(modelFolder[i]).forEach(function(file) {
            if (~file.indexOf('.js')) {
                require(modelFolder[i] + '/' + file)
            }
        });
    }
}