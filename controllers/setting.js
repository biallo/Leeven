/**
 * Module dependencies.
 */
var async = require('async');
var UserDao = require('./../dao').UserDao;
var fs = require('fs');

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
        _id: req.body._id
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
    var doc = req.body,
        files = req.files,
        name = doc.name;
    if (name === 'avatar.png') {
        name = files.file.name;
    }

    fs.rename(files.file.path, process.common.avatarPath + '/' + name);

    UserDao.update({
        _id: doc._id
    }, {
        avatar: name
    }, '', function(err) {
        if (!err) {
            return res.sucMsg();
        } else {
            fs.unlink(process.common.avatarPath + '/' + name);
            return res.errMsg([{
                msg: '修改失败，请稍后重试'
            }]);
        }
    });
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
    req.assert('pwdnow', '当前密码不能为空').notEmpty();
    req.assert('password', '密码不能为空').notEmpty();
    req.assert('confirmPassword', '重复新密码不能为空').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    var doc = req.body;

    UserDao.findById(doc._id, function(err, user) {
        if (err) {
            return res.render('setting/pwd', {
                user: req.user,
                isError: 'error',
                msg: '修改失败，请稍后再试。(' + err + ')'
            });
        } else {
            if (!user.authenticate(doc.pwdnow)) {
                return res.render('setting/pwd', {
                    user: req.user,
                    isError: 'error',
                    msg: '当前密码错误。'
                });
            } else {
                user.password = doc.password;
                user.save(function() {
                    req.user = user;
                    return res.render('setting/pwd', {
                        user: req.user,
                        success: '修改成功！'
                    });
                });
            }
        }
    });

}
