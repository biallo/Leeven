/**
 * Module dependencies.
 */
var project = require('./../controllers/project');


/**
 *  server `route`
 *  @param {function} app
 *  @param {function} auth
 */
module.exports = function(app, auth) {

  app.get('/project/:groupID', auth.requiresLogin, project.list);

}