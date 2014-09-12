/**
 * Module dependencies.
 */
var async = require('async');
var UserDao = require('./../dao').UserDao;

/**
 * Render index view
 */
exports.list = function(req, res) {

	UserDao.getList({
        criteria: {
            group_id: req.params.groupID
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
            return res.render('projects/list', {
                user: req.user
            });
        }
    });

}