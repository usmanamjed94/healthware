
/**
 * Module dependencies.
 */

var session = require('express-session');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoStore = require('connect-mongo')(session);
var winston = require('winston');
var helpers = require('view-helpers');
var config = require('./config.js');
var pkg = require('../package.json');
var mongoose       = require('mongoose');
var cors = require('cors');
var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app) {

    // Use winston on production
    var log;
    if (env !== 'development') {
        log = {
            stream: {
                write: function (message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        log = 'dev';
    }

    // Don't log during tests
    // Logging middleware
    if (env !== 'test') app.use(morgan(log));


    // expose package.json to views
    app.use(function (req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });


    // bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization, Accept');
        next();
    });
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    // cookieParser should be above session
    app.use(cookieParser());

    app.use(cookieSession({ secret: 'secret' }));

    app.use(session({
        secret: pkg.name,
        proxy: true,
        resave: true,
        saveUninitialized: true,

        store: new mongoStore({
            mongooseConnection: mongoose.connection,
            url: config.db,
            collection : 'sessions'
        })
    }));

    // should be declared after session and flash
    app.use(helpers(pkg.name));

};
