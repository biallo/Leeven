var express = require('express');
var path = require('path');
var hbs = require('hbs');
var fs = require('fs-extra');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');

module.exports = function(app, passport, mongoose) {

    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(require('less-middleware')(path.join(process.common.rootPath, 'public')));
    app.use(cookieParser());
    app.use(express.static(path.join(process.common.rootPath, 'public')));

    // view engine setup
    app.set('views', path.join(process.common.rootPath, 'views'));
    app.set('view engine', 'hbs');

    //add variables into route
    app.use(function(req, res, next) {
        res.locals.isproduction = (app.get('env') === 'production');
        next();
    });

    //hbs helper
    hbs.registerPartial('header', fs.readFileSync(process.common.rootPath + '/views/_header.hbs', 'utf8'));
    hbs.registerPartial('footer', fs.readFileSync(process.common.rootPath + '/views/_footer.hbs', 'utf8'));
    hbs.registerPartial('script', fs.readFileSync(process.common.rootPath + '/views/_script.hbs', 'utf8'));

    //express/mongo session storage
    app.use(session({
        secret: 'leeven',
        secret: 'stratum-proxy',
        resave: false,
        maxAge: new Date(Date.now() + (6000 * 60 * 24)), // 1 day
        store: new MongoStore({
            db: mongoose.connection.db
        })
    }));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());

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

}
