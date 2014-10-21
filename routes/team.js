/**
 * Module dependencies.
 */
var team = require('./../controllers/team');


/**
 *  团队
 */
module.exports = function(app, auth) {

  app.get('/team', auth.needToLogin, team.index);
  app.post('/team', auth.needToLogin, team.swap);

  //新建团队
  app.get('/team/create', auth.needToLogin, team.pageCreate);
  app.post('/team/create', auth.needToLogin, team.create);

}