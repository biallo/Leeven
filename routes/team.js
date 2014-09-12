/**
 * Module dependencies.
 */
var team = require('./../controllers/team');


/**
 *  团队
 */
module.exports = function(app, auth) {

  app.get('/team', auth.needToLogin, team.index);


}