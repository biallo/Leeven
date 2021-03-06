var express = require('express');
var hbs = require('hbs');
var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');
var config = require('./config/config.default.js');
var path = require('path');

//production environmentr
if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    console.log('[Environment]   ' + process.env.NODE_ENV);
    config = _.extend(config, require('./config/config.production.js'));
} else {
    console.log('[Environment]   development');
}

//initial `common` into process
process.common = {
    rootPath: __dirname,
    config: config,
    avatarPath: path.join(process.cwd(), 'public/images', 'avatar')
};

//add utils into `process.common`
process.common.utils = require('./libs/utils');


var app = express();
var db = require('./libs/db');

//initial db
db.connect(config.DB, function(mongoose) {

    var auth = require('./libs/middlewares/authorization');

    //initial passport
    require('./libs/passport')(passport);

    //initial express
    require('./libs/express')(app, passport, mongoose);

    //initial routes
    require('./libs/routes.load')(app, auth);

    // catch 404 and forward to error handler
    app.use(function(req, res) {
        var err = new Error('Not Found');
        err.status = 404;
        res.render('404', {
            layout: 'error-layout'
        });
    });

    // error handlers
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res) {
            res.status(err.status || 500);
            res.render('500', {
                layout: 'error-layout',
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('500', {
            layout: 'error-layout',
            message: err.message,
            error: {}
        });
    });

    app.listen(2333);

    console.log('Listen on port 2333');

});
