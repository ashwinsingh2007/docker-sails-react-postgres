/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
const jwt = require('jsonwebtoken');

module.exports.http = {

  middleware: {
    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'verifyAccessToken'
    ],

    /**
     * Middleware to verify api and fetch user details
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    verifyAccessToken: async function (req, res, next) {
      try {
        const accessToken = req.headers.authorization || req.query.access_token || req.headers.Authorization;
        // console.log('0-0--0-0-0-0-0-accessToken-0-0-0-00', accessToken)
        if (!accessToken) {
          return next();
        }
        const config = { // make this in some global config file
          secret: 'ADSGAECEAF34csdf1dfdswe21'
        }
        const tokenDetail = await jwt.verify(accessToken, config.secret);
        if (tokenDetail && tokenDetail.userId) {
          const users = await Users.findOne({
            id: tokenDetail.userId
          });
          req.user = users;
        }
        return next();
      } catch (e) {
        return next();
      }
    },
    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  },

};
