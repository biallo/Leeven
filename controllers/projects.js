/**
 * Module dependencies.
 */
var async = require('async');
var ProjectDao = require('./../dao').ProjectDao;

/**
 * 获取项目列表
 */
exports.list = function(req, res) {

    var groupID = req.params.groupID;

    ProjectDao.getList({
        group_id: groupID
    }, {
        'createdTime': '-1'
    }, function(err, list) {
        if (!err) {
            return res.render('project/list', {
                user: req.user,
                projects: list
            });
        } else {
            return res.render('project/list', {
                user: req.user
            });
        }
    });

}

/**
 * 新建项目
 */
exports.create = function(req, res) {

	req.assert('name', '名称不能为空').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    var doc = req.body;

    doc.group_id = req.params.groupID;

    ProjectDao.create(doc, function(err, doc) {
        if (!err) {
            return res.sucMsg();
        } else {
            return res.errMsg([{
                msg: '创建失败，请稍后重试'
            }]);
        }
    });
}

/**
 * 更新项目
 */
exports.update = function(req, res) {

}
