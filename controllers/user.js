/**
 * Module dependencies.
 */
var async = require('async');
var UserDao = require('./../dao').UserDao;
var TeamDao = require('./../dao').TeamDao;

var loginJokes = [{
        icon: 'loading',
        text: '少壮不努力，永远在loading～'
    }, {
        icon: 'keyboard',
        text: '键盘撸得好，登录问题少～'
    }, {
        icon: 'thumbs down',
        text: '好事做得少，登录过不了～'
    }],
    signupJokes = [{
        icon: 'time',
        text: '时不我待，注册要快。'
    }, {
        icon: 'quote left',
        text: '螃蟹在剝我的壳，而注册表单在填你。'
    }];

/**
 * Render index view
 */
exports.index = function(req, res) {
    return res.render('index/login', {
        layout: 'clean-layout',
        joke: loginJokes[parseInt(Math.random() * loginJokes.length)]
    });
}

/**
 * Render signup view
 */
exports.signup = function(req, res) {

    var teamID = req.params.teamID,
        url = '';

    if (teamID) {
        url = '/' + teamID;
    }

    return res.render('index/signup', {
        layout: 'clean-layout',
        joke: signupJokes[parseInt(Math.random() * signupJokes.length)],
        action: '/signup' + url
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
        return res.render('index/signup', {
            layout: 'clean-layout',
            joke: loginJokes[parseInt(Math.random() * loginJokes.length)],
            isError: 'error',
            msg: errors[0]
        });
    };

    var doc = req.body;
    var teamID = req.params.teamID ? req.params.teamID : '';


    async.auto({
        findUserByEmail: function(cb) { //验证邮箱是否已被注册
            UserDao.findByQuery({
                email: doc.email
            }, cb)
        },
        findTeamById: function(cb, results) { //验证teamID的有效性
            if (teamID) { //如果注册的url中包含teamID
                TeamDao.findById(teamID, cb);
            } else {
                cb();
            }
        },
        createUser: ['findUserByEmail', 'findTeamById', function(cb, results) { //创建用户
            var resTeam = results.findTeamById;
            if (resTeam) { //团队ID有效
                doc.teams = [{
                    name: resTeam.name,
                    id: resTeam._id
                }];
                doc.team_now = resTeam._id;
            }
            UserDao.create(doc, cb);
        }]
    }, function(cb, results) {

        var errMsg = '',
            goLogin = false;

        if (results.findUserByEmail) { //邮箱已被注册
            errMsg = doc.email + '已被注册。';
        } else if (!results.createUser) {
            errMsg = '注册失败，请稍后重试。';
        } else if (teamID) { //有teamID参数
            if (!results.findTeamById) { //团队ID无效
                errMsg = '团队ID无效。';
            } else {
                goLogin = true;
            }
        } else {
            goLogin = true;
        }

        return res.render('index/signup', {
            layout: 'clean-layout',
            joke: signupJokes[parseInt(Math.random() * signupJokes.length)],
            isError: 'error',
            msg: errMsg,
            goLogin: goLogin
        });

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
        var errMsg = '';
        if (!user) {
            errMsg = '邮箱错误。';
        } else if (!user.authenticate(doc.password)) {
            errMsg = '密码错误。';
        } else {
            if (user.state === 0) {
                errMsg = '账号被锁定';
            } else {
                req.logIn(user, function(err) {
                    clearUser(user);
                    if (err) {
                        return next(err);
                    } else {
                        return res.redirect('/');
                    }
                });
            }
        }

        return res.render('index/login', {
            layout: 'clean-layout',
            joke: loginJokes[parseInt(Math.random() * loginJokes.length)],
            isError: 'error',
            msg: errMsg
        });


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
