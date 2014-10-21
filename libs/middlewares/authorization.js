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
        if (req.user.team_now) { //如果已加入了团队，跳转到“项目”页面
        	return res.redirect('/projects');
        }else{ //跳转到“创建团队”页面
        	return res.redirect('/team/create');
        }
    }
    next();
}