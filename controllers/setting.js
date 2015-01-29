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

/**
 * Update basic info
 */
exports.updateBasic = function(req, res) {

    req.assert('name', '名称不能为空').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    UserDao.update({
        _id: req.body.userID
    }, req.body, '', function(err) {
        if (!err) {
            return res.redirect('/setting');
        } else {
            return res.render('setting/index', {
                isError: 'error',
                msg: '修改失败，请稍后再试。(' + err + ')'
            });
        }
    });

}

/**
 * Render avatar view
 */
exports.avatar = function(req, res) {

    return res.render('setting/avatar', {
        user: req.user
    });

}

/**
 * Update avatar
 */
exports.updateAvatar = function(req, res) {

}

/**
 * Render pwd view
 */
exports.pwd = function(req, res) {

    return res.render('setting/pwd', {
        user: req.user
    });

}

/**
 * Update password
 */
exports.updatePwd = function(req, res) {

}
