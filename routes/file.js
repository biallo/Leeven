/**
 * Module dependencies.
 */
var file = require('./../controllers/file');


/**
 *  server `route`
 *  @param {function} app
 *  @param {function} auth
 */
module.exports = function(app, auth) {

  app.get('/file', auth.requiresLogin, file.list);

}