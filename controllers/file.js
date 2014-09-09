/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

exports.list = function(req, res) {
  return res.render('file/list');
}