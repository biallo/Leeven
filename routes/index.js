/**
 * Module dependencies.
 */
var user = require('./../controllers/user');


/**
 *  server `route`
 *  @param {function} app
 *  @param {function} auth
 */
module.exports = function(app, auth) {

    //登录
    app.get('/', auth.noNeedLogin, user.index);
    app.post('/login', user.login);

    //注册
    app.get('/signup', auth.noNeedLogin, user.signup);
    app.post('/signup', user.create);

    //退出登录
    app.get('/logout', user.logout);
}
