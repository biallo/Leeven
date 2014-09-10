/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

exports.list = function(req, res) {
  return res.render('project/list', {user: req.user});
}