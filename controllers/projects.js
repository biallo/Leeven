/**
 * Module dependencies.
 */
var async = require('async');
var ProjectDao = require('./../dao').ProjectDao;
var FileDao = require('./../dao').FileDao;

/**
 * 项目列表
 */
exports.list = function(req, res) {

    ProjectDao.getList({
        criteria: {
            team_id: req.user.team_now
        }
    }, {
        'createdTime': '-1'
    }, function(err, list) {
        if (!err) {
            return res.render('projects/list', {
                user: req.user,
                projects: list,
                nav_projects: true
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
 * 新建项目
 */
exports.create = function(req, res) {

    req.assert('name', '名称不能为空').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    var doc = req.body;

    doc.team_id = req.user.team_now;

    ProjectDao.create(doc, function(err, model) {
        if (!err) {
            return res.sucMsg();
        } else {
            return res.errMsg([{
                msg: '创建失败，请稍后重试'
            }]);
        }
    });
};

/**
 * 编辑项目
 */
exports.update = function(req, res) {
    req.assert('name', '名称不能为空').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    ProjectDao.update({
        _id: req.params.projectID
    }, req.body, '', function(err) {
        if (!err) {
            return res.sucMsg();
        } else {
            return res.errMsg([{
                msg: '编辑失败，请稍后重试'
            }]);
        }
    });
};


/**
 * 删除项目
 */
exports.del = function(req, res) {
    if (req.params.projectID) {
        ProjectDao.del({
            _id: req.params.projectID
        }, function(err) {
            if(!err){
                FileDao.del({
                    project_id: req.params.projectID
                }, function() {
                    if (!err) {
                        return res.sucMsg();
                    } else {
                        return res.errMsg([{
                            msg: '删除失败，请稍后重试'
                        }]);
                    }
                });
            }else{
                return res.errMsg([{
                    msg: '删除失败，请稍后重试'
                }]);
            }
        });
    } else {
        return res.errMsg([{
            msg: '参数错误，删除失败。'
        }]);
    }
};
