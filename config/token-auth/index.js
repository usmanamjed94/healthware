/**
 *
 * Created by usman on 1/19/16.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

function checkHeader(req) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        return req;
    } else {
        return null;
    }
};

exports.ensureAuthentication = function(req, res, next){
    console.log("Value of req before" + req);
    req = checkHeader(req);
    console.log("Value of req" + req);
    if(req == null){
        return res.status(403).send({
            type: false,
            data: "Error occured: Token not set"
        })
    }
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            req.user = user;
            next();
        }
    });
};

exports.isPermitted = function(req, res, next){
    if(req.user.role == 1) next();
    else res.status(403).json({
        type: false,
        data: "User is forbidden to make take this action"
    });
};
