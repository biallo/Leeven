/**
 * Module dependencies.
 */
var async = require('async');
var UserDao = require('./../dao').UserDao;

var loginJokes = [{
        icon: 'loading',
        text: '少壮不努力，永远在loading～'
    }, {
        icon: 'keyboard',
        text: '键盘撸得好，登录问题少～'
    }],
    signupJokes = [{
        icon: 'thumbs down',
        text: '好事做得少，注册过不了～'
    }, {
        icon: 'money',
        text: '注册就能获得给我一块钱的资格！'
    }];

/**
 * Render index view
 */
exports.index = function(req, res) {
    return res.render('index/login', {
        layout: 'login-layout',
        joke: loginJokes[parseInt(Math.random() * loginJokes.length)]
    });
}

/**
 * Render signup view
 */
exports.signup = function(req, res) {
    return res.render('index/signup', {
        layout: 'login-layout',
        joke: signupJokes[parseInt(Math.random() * signupJokes.length)]
    });
}

/**
 * Create user
 */
exports.create = function(req, res) {
    req.assert('email', '邮箱不能为空').notEmpty();
    req.assert('email', '邮箱填写错误').isEmail();
    req.assert('password', '密码不能为空').notEmpty();
    req.assert('confirmPassword', '密码不能为空').notEmpty();
    req.assert('name', '昵称不能为空').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    var doc = req.body;

    //验证邮箱是否已被注册
    async.auto({
        'findUserByEmail': function(cb) {
            UserDao.findByQuery({
                email: doc.email
            }, cb)
        }
    }, function(cb, results) {
        if (results.findUserByEmail) {
            return res.errMsg([{
                msg: doc.email + '已被注册'
            }]);
        } else {
            UserDao.create(doc, function(err, doc) {
                if (!err) {
                    return res.sucMsg();
                } else {
                    return res.errMsg([{
                        msg: '创建失败，请稍后重试'
                    }]);
                }
            });
        }
    });

}

/**
 * Login
 */
exports.login = function(req, res) {
    req.assert('email', '邮箱不能为空').notEmpty();
    req.assert('email', '邮箱填写错误').isEmail();
    req.assert('password', '密码不能为空').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    var doc = req.body;

    UserDao.getModelByQuery({
        email: doc.email
    }, function(err, user) {
        if (!user) {
            return res.errMsg([{
                msg: '邮箱错误'
            }]);
        } else if (!user.authenticate(doc.password)) {
            return res.errMsg([{
                msg: '密码错误'
            }]);
        } else {
            if (user.state === 0) {
                return res.errMsg([{
                    'msg': '账号被锁定'
                }]);
            } else {
                req.logIn(user, function(err) {
                    clearUser(user);
                    if (err) { return next(err); }
                    return res.sucMsg({
                        group_id: req.user.group_id
                    });
                });
            }
        }
    });
};

/**
 *  Logout action ,clear the `user` in the request
 */
exports.logout = function(req, res) {
    req.logout();
    delete req.user;
    res.redirect('/');
};

function clearUser(user) {
    user.hashed_password = null;
    user.salt = null;
    return user;
}
