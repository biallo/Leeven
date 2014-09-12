/**
 * Module dependencies.
 */
var async = require('async');
var UserDao = require('./../dao').UserDao;

/**
 * Render index view
 */
exports.index = function(req, res) {

	return res.render('setting/index', {
        user: req.user
    });

}

exports.avatar = function(req, res) {

    return res.render('setting/avatar', {
        user: req.user
    });

}

exports.pwd = function(req, res) {

    return res.render('setting/pwd', {
        user: req.user
    });

}