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
            team_id: req.params.teamID
        }
    }, {
        'createdTime': '-1'
    }, function(err, list) {
        if (!err) {
            return res.render('members/list', {
                user: req.user,
                members: list
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
