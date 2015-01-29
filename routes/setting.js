/**
 * Module dependencies.
 */
var setting = require('./../controllers/setting');


/**
 *  设置
 */
module.exports = function(app, auth) {

  //基本信息
  app.get('/setting', auth.needToLogin, setting.index);

  //修改基本信息
  app.post('/setting/basic', auth.needToLogin, setting.updateBasic);

  //修改头像页面
  app.get('/setting/avatar', auth.needToLogin, setting.avatar);

  //修改头像
  app.post('/setting/avatar', auth.needToLogin, setting.updateAvatar);

  //修改密码页面
  app.get('/setting/pwd', auth.needToLogin, setting.pwd);

  //修改密码
  app.post('/setting/pwd', auth.needToLogin, setting.updatePwd);

}