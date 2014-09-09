/**
 * 是否登录
 */
exports.requiresLogin = function(req, res, next) {
	console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};