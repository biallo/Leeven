/**
 * Module dependencies.
 */
var async = require('async');
var UserDao = require('./../dao').UserDao;
var TeamDao = require('./../dao').TeamDao;
var _ = require('underscore');

/**
 * Render index view
 */
exports.list = function(req, res) {

    async.auto({
        getUsers: function(cb) {
            UserDao.getList({
                criteria: {
                    teams: {
                        $elemMatch: {
                            id: req.user.team_now
                        }
                    }
                }
            }, {
                'createdTime': '-1'
            }, cb);
        },
        getTeam: function(cb) {
            TeamDao.findById({
                _id: req.user.team_now
            }, cb);
        }
    }, function(cb, results) {
        var users = results.getUsers,
            team = results.getTeam;
        if (users && team) {
            _.each(users, function(item, index) {
                if (String(item._id) === String(team.user_id)) {
                    item.owner = true;
                }
            });
            return res.render('members/list', {
                user: req.user,
                team: team,
                members: users,
                url: req.protocol + '://' + req.headers.host,
                nav_members: true
            });
        } else {
            return res.render('500', {
                layout: 'error-layout',
                message: err.message,
                error: err
            });
        }
    });

};


/**
 * 添加新的成员到团队
 */
exports.add = function(req, res) {

    async.auto({
        getUserByEmail: function(cb) { //验证用户是否存在
            UserDao.getModelByQuery({
                email: req.body.email
            }, cb);
        },
        getTeamById: function(cb) { //获取该团队
            TeamDao.findById({
                _id: req.user.team_now
            }, cb);
        },
        isUserInTeam: ['getUserByEmail', 'getTeamById', function(cb, results) {
            var resUser = results.getUserByEmail,
                resTeam = results.getTeamById;

            if (resUser && resTeam) { //用户存在,且成功查询到团队信息
                //检查该用户是否已经加入该团队
                var teams = resUser.teams,
                    j = 0;
                for (var i = 0; i < teams.length; i++) {
                    if (req.user.team_now.toString() === teams[i].id.toString()) {
                        j++;
                    }
                }

                if (j) {
                    cb();
                } else {
                    var resTeamNow = resUser.team_now;
                    if (!resTeamNow) { //若该用户尚无team_now
                        resTeamNow = resTeam._id;
                    }
                    //在用户的信息中加入该团队
                    UserDao.update({
                        email: req.body.email
                    }, {
                        $set: {
                            team_now: resTeamNow
                        },
                        $push: {
                            teams: {
                                name: resTeam.name,
                                id: resTeam._id
                            }
                        }
                    }, cb);
                }

            } else {
                cb();
            }
        }]
    }, function(cb, results) {
        if (!results.getUserByEmail || !results.getTeamById || !results.isUserInTeam) {
            return res.errMsg([{
                msg: '添加失败，请稍后重试'
            }]);
        } else {
            return res.sucMsg();
        }
    });




};
