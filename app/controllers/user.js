/**
 * Created by usman on 1/30/16.
 */


var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Family = mongoose.model('family');
var helper = require('../helper_functions/password');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

exports.find = function(req, res){
    User.find({},{token:0,__v:0}, function(err, users){
        if(err) { res.status(400).send({err: err })}
        else{
          res.send({type: true, result: users});
        }
    });
};
exports.findOne = function(req, res){
    User.findById(req.params.id,{token:0,__v:0}).populate('family').exec(function(err, user){
        if(err) { res.status(400).send({err: err })}
        else{
          res.send({type: true, result: user});
        }
    });
};

function saveAll( docs,callback ){
  var count = 0;
  var arr = []
  docs.forEach(function(doc){
    if(!doc._id){
      var family = new Family(doc);
      family.save(function(err,result){
        if(err)
          callback(err);
        else{
          count++;
          arr.push(result._id);
          if( count == docs.length ){
             callback(null,arr);
          }
        }
      });
    }
    else{
      // var family = new Family(doc);
      arr.push(doc._id);
      Family.update({_id: doc._id}, {$set: doc},function(err,result){
        if(err)
          callback(err);
        else{
          count++;
          console.log(result);
          if( count == docs.length ){
             callback(null,arr);
          }
        }
      });
    }
  });
}
exports.update = function(req, res){
    var id= req.params.id;
    var updatePairs= req.body;
    saveAll(updatePairs.family,function(err,array){       // save all family members
      if(err)
        res.status(400).send({type: false, err: err})
      else{
        console.log(array);
        updatePairs.family = array;   // family ObjectId array
        User.findOneAndUpdate({ _id: id}, {$set: updatePairs,token:0,__v:0}).populate('family').exec( function(err, result){
            if(err) { res.status(400).send({ type: false, err: err}) }
            else{
              res.send({type: true, result: result});
            }
        });
      }
    });
};

exports.login = function(req, res) {
    console.log("Password recvd while login user:" + req.body.password);
    User.findOne({email: req.body.email}, '+hashed_password',function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
              console.log(user);
                bcrypt.compare(req.body.password, user.hashed_password, function(err,result) {
                    console.log("Bcrypt returns: " + result);
                    if(err){
                        res.status(501).send();
                    }else{
                        if(result) {
                            console.log(user)
                            res.json({
                                type: true,
                                data: {token: user.token}
                            });
                        }else{

                            res.status(401).json({
                                type: false,
                                data: "Invalid Password"
                            })
                        }
                    }
                });
            } else {
                res.status(401).json({
                    type: false,
                    data: "User doesn't exist"
                });
            }
        }
    });
};

exports.create = function (req, res) {
  var updatePairs = req.body;
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            console.log("Error");
            res.status(501).json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                console.log(user);
                res.status(400).json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
              saveAll(updatePairs.family,function(err,array){       // save all family members
                if(err)
                  res.status(400).send({type: false, err: err})
                else{
                  console.log(array);
                  updatePairs.family = array;   // family ObjectId array
                  var userModel = new User(updatePairs);

                  console.log("Password recvd while creating user:" + req.body.password);
                  userModel.save(function (err, user1) {
                      if(err){
                          res.status(400).send({
                              type: false,
                              data:err
                          });
                      }else {
                          helper.hashPassword(req.body.password, function(hashed_password) {
                              user1.token = jwt.sign(req.body, "asdasdasdasdasd");
                              user1.hashed_password= hashed_password;
                              console.log("Hashed password as I am saving: " + hashed_password);
                              user1.save(function (err, user2) {
                                  user2 = user2.toObject();
                                  delete user2["hashed_password"];
                                  delete user2["token"];
                                  delete user2["__v"];
                                  delete user2["_id"];
                                  res.json({
                                      type: true,
                                      result: user2,
                                      token: user1.token
                                  });
                              });
                          });
                      }
                  });   // usermodel save
                }
              });       // saveAll
            }
        }
    })
};

exports.changePassword = function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    return res.status(404).json({result: false, error: 'No account with that email address exists.'});
                }

                user.resetPasswordToken = token;

                console.log("Token While saving: " + token);
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {

            var smtpTransport = nodemailer.createTransport('smtps://usmankhen@gmail.com:Forgot your@smtp.gmail.com');
            var mailOptions = {
                to: 'usmanokhan@hotmail.com',
                from: 'usmanken@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            console.log("Got here");
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log(err);
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.status(200).send({result: true, data: "Mail send to the user"});
    });
};


exports.reset = function(req, res) {
    async.waterfall([
        function(done) {
            console.log("Token while reading" + req.params.token);
            User.findOne({ resetPasswordToken: req.params.token }, function(err, user) {
                if (!user) {
                    return res.status(404).send({
                        type: false,
                        error: "User doens't exist"
                    });
                }

                user.password = helper.hashPassword(req.body.password);
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                        done(err, user);
                });
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport('smtps://usmankhen@gmail.com:*****@smtp.gmail.com');
            var mailOptions = {
                to: 'usmanokhan@hotmail.com',
                from: 'usmanken@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            console.log("Got to sending data");
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log("Error SMTP?: " + err);
                done(err);
            });
        }
    ], function(err) {
        if(err){
            console.log(err);
            res.status(501).json({type: false, error:"Internal server error"});
        }else {
            res.status(200).json({type: true, result:"Instructions sent to the email."});
        }
    });
};
