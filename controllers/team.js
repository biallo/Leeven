/**
 * Module dependencies.
 */
var async = require('async');
var UserDao = require('./../dao').UserDao;

/**
 * Render index view
 */
exports.index = function(req, res) {

	return res.render('team/index', {
        user: req.user
    });

}
