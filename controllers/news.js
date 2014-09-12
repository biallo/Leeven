/**
 * Module dependencies.
 */
var async = require('async');

/**
 * Render index view
 */
exports.list = function(req, res) {
    return res.render('news/list', {
        user: req.user
    });
}