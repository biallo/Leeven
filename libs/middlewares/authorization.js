/**
 * 需要登录
 */
exports.needToLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};

/**
 * 无需登录
 * 登录后无法访问登录、注册页面
 */
exports.noNeedLogin = function(req, res, next) {
	if (req.isAuthenticated()) {
        return res.redirect('/project/' + req.user.group_id);
    }
    next();
}