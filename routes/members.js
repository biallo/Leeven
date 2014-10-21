/**
 * Module dependencies.
 */
var members = require('./../controllers/members');


/**
 *  成员
 */
module.exports = function(app, auth) {

  //获取成员列表
  app.get('/members', auth.needToLogin, members.list);

  //添加新的成员到团队
  app.post('/members/add', auth.needToLogin, members.add);

}