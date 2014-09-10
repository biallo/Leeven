/**
 * Module dependencies.
 */
var project = require('./../controllers/projects');


/**
 *  server `route`
 *  @param {function} app
 *  @param {function} auth
 */
module.exports = function(app, auth) {

  app.get('/projects/:groupID', auth.needToLogin, project.list);

}