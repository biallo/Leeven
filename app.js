var express = require('express');
var path = require('path');
var fs = require('fs-extra');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var hbs = require('hbs');
var passport = require('passport');
var expressValidator = require('express-validator');

var config = require('./config/config.default.js');



//production environment
if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    console.log('[Environment]   ' + process.env.NODE_ENV);
    config = _.extend(config, require('./config/config.production.js'));
} else {
    console.log('[Environment]   development');
}

//initial `common` into process
process.common = {
    rootPath: __dirname,
    config: config
};

//add utils into `process.common`
process.common.utils = require('./libs/utils');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(expressValidator());
app.use(require('less-middleware')(path.join(__dirname, 'public')));

//use passport session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


//hbs helper
hbs.registerPartial('header', fs.readFileSync(__dirname + '/views/_header.hbs', 'utf8'));
hbs.registerPartial('footer', fs.readFileSync(__dirname + '/views/_footer.hbs', 'utf8'));

//add `errMsg` and `sucMsg` into request
app.use(function(req, res, next) {
    res.errMsg = function(data) {
        res.json({
            status: 0,
            result: data
        });
    };
    res.sucMsg = function(data) {
        res.json({
            status: 1,
            result: data
        });
    };
    next();
});


var db = require('./libs/db');
//initial db
db.connect(config.DB, function(mongoose) {

    var auth = require('./libs/middlewares/authorization');

    //initial passport
    require('./libs/passport')(passport);

    //initial routes
    require('./libs/routes.load')(app, auth);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    app.listen(2333);

    console.log('Listen on port 2333');

});
