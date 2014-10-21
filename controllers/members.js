/**
 * Module dependencies.
 */
var async = require('async');
var UserDao = require('./../dao').UserDao;

/**
 * Render index view
 */
exports.list = function(req, res) {

    //TODO: 先验证teamID的合法性
    
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
    }, function(err, list) {
        if (!err) {
            return res.render('members/list', {
                user: req.user,
                members: list,
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

}
