/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    UserDao = require('./../dao').UserDao;

/**
 * exports `passport`.
 */
module.exports = function(passport, config) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    //Deserialize sessions
    passport.deserializeUser(function(user, done) {
      UserDao.findById(user._id, function (err, user) {
        done(err, user);
      });
    });

};
