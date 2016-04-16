
/**
 * Module dependencies.
 */

var home = require('../app/controllers/home');
var authenticate = require('./token-auth/index');
var user = require('../app/controllers/user.js');
var client = require('../app/controllers/client.js');
var family = require('../app/controllers/family.js');
var company = require('../app/controllers/company.js');
var crypto = require('crypto')


/**
 * Expose
 */
module.exports = function (app) {

  app.get('/company/:id', company.getCompany);
  app.post('/createCompany', authenticate.ensureAuthentication, authenticate.isPermitted, company.createCompany);
  app.get('/requiresAuthentication', authenticate.ensureAuthentication, home.authenticateView);
  //  User routes
  app.post('/user', user.create);
  app.post('/login', user.login);
  app.post('/changePassword', user.changePassword);
  app.post('/reset/:token', user.reset);
  app.put('/user/:id', user.update);
  app.get('/user', user.find);
  app.get('/user/:id', user.findOne);
  //  User routes

  //  client routes
  app.post('/client', client.create);
  app.put('/client/:id', client.update);
  app.get('/client', client.find);
  app.get('/client/:id', client.findOne);
  //  client routes
  // family
  app.post('/client/:id/family', family.create);
  app.put('/client/:id/family/:f_id', family.update);
  app.get('/client/:id/family', family.find);
  app.get('/client/:id/family/:f_id', family.findOne);
  // family
  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);
    // error page
    res.status(500).send( { type: false, error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).send({
      type: false,
      error: 'Not found' + req.originalUrl
    });
  });

};
