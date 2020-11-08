/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /api/test/get': 'UserController.testUserControl',
  'POST /api/Users/signup': 'UserController.signup',
  'POST /api/Users/login': 'UserController.login',
  'GET /api/Users/getCurrentUser': 'UserController.getCurrentUser',
};
