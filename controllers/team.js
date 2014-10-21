/**
 * Module dependencies.
 */
var async = require('async');
var TeamDao = require('./../dao').TeamDao;
var UserDao = require('./../dao').UserDao;

/**
 * Render index view
 */
exports.index = function(req, res) {

    if (req.user.team_now) { //有团队信息

        //加载当前用户所加入的团队
        var data = req.user.teams,
            teams = [],
            active = false;

        for (var i = 0; i < data.length; i++) {
            if (req.user.team_now.toString() == data[i].id.toString()) {
                active = true;
            } else {
                active = false;
            }
            teams.push({
                id: data[i].id,
                name: data[i].name,
                active: active
            });
        }

        return res.render('team/index', {
            user: req.user,
            teams: teams
        });
    } else { //没有团队信息
        res.redirect('/');
    }

};

/**
 * 切换用户的当前团队
 */
exports.swap = function(req, res) {
    UserDao.update({
        _id: req.user._id
    }, {
        $set: {
            team_now: req.body.team_now
        }
    }, function(err) {
        return res.sucMsg();
    });
};


/**
 * “新建团队”页面
 */
exports.pageCreate = function(req, res) {

    return res.render('team/create', {
        user: req.user,
        layout: 'clean-layout',
        isNew: req.user.team_now
    });

};

/**
 * post:新建团队
 */
exports.create = function(req, res) {

    req.assert('name', '团队名称不能为空').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        return res.render('team/create', {
            user: req.user,
            layout: 'clean-layout',
            isError: 'error',
            msg: errors[0].msg
        });
    };

    var doc = req.body;

    doc.user_id = req.user._id;

    async.auto({
        createTeam: function(cb) { //创建团队
            TeamDao.create(doc, cb);
        },
        addTeamToUser: ['createTeam', function(cb, results) { //添加团队ID到创建者
            var teamId = results.createTeam._id,
                teamName = results.createTeam.name;
            UserDao.update({
                _id: doc.user_id
            }, {
                $set: {
                    team_now: teamId
                },
                $push: {
                    teams: {
                        name: teamName,
                        id: teamId
                    }
                }
            }, cb);

        }]
    }, function(cb, results) {

        if (!results.createTeam._id || !results.addTeamToUser[1].ok) { //创建团队失败 || 添加团队ID到创建者失败
            return res.render('team/create', {
                user: req.user,
                layout: 'clean-layout',
                isError: 'error',
                msg: '创建团队失败'
            });
        } else {
            // 创建团队成功，跳转到team页面
            res.redirect('/team');
        }

    });

};
