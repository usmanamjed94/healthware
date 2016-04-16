
/*!
 * Module dependencies.
 */
var config = require('../../config/config.js');


exports.index = function (req, res) {
    res.render('home/index', {
        title: 'Node Express Mongoose Boilerplate'
    });
};


exports.authenticateView = function(req, res){
    res.send(req.user);
}
