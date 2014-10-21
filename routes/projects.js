/**
 * Module dependencies.
 */
var projects = require('./../controllers/projects');


/**
 *  项目
 */
module.exports = function(app, auth) {

  //获取项目列表
  app.get('/projects', auth.needToLogin, projects.list);

  //新建项目
  app.post('/projects', projects.create);

  //编辑项目
  app.put('/projects/:projectID', projects.update);

  //删除项目
  app.delete('/projects/:projectID', projects.del);

}