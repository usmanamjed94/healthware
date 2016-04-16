var mongoose = require('mongoose');
var Family = mongoose.model('family');
var Client = mongoose.model('Client');
var User = mongoose.model('User');

exports.create = function(req, res){
    var familyJson = req.body;
    familyJson.parent_id = req.params.id;
    var family = new Family(familyJson);
    family.save(function(err, result){
        if(err) {
            res.status(400).json({type: false, err: err});
        } else {
          Client.find({_id: req.params.id}, {_id: 1}, {},function (err, client) {
            if (err) {
              res.status(400).json({type: false, err: err});
            }
            else if(client.length > 0){
              Client.update({ _id: req.params.id },{ $push: { family: result._id } },{},function (err, client) {
                if (err)
                  res.status(400).json({type: false, err: err});
                else {
                  console.log(result);
                  res.status(200).json({type: true, result: result});
                }
              });
            }
            else{
              User.update({ _id: req.params.id },{ $push: { family: result._id } },{},function (err, client) {
                if (err)
                  res.status(400).json({type: false, err: err});
                else {
                  res.status(200).json({type: true, result: result});
                }
              });
            }
          });
        }
    })
};

exports.update = function(req, res) {
    var id = req.params.f_id;
    var updatePairs = req.body;
    Family.findOneAndUpdate({_id: id}, {$set: updatePairs}, {new: true}, function (err, result) {
        if (err) {
            res.status(400).send({type: false, err: err})
        }
        else {
            res.send({type: true, result: result})
        }
    });
};
exports.remove = function(req, res){
    var id= req.params.f_id;
    Family.remove({ _id: id}, function(err, result){
        if(err) { res.status(400).send({type: false,err: err}) }
        else{
            res.send({type: true, result:result})
        }
    });
};

exports.find = function(req, res){
    var id= req.params.id;
    Family.find({ cli_id: id}, function(err, result){
        if(err) { res.status(400).send({type: false,err: err}) }
        else{
            res.send({type: true, result:result})
        }
    });
};

exports.findOne = function(req, res){
    var id= req.params.id;
    Family.findById({ _id: id}, function(err, result){
        if(err) { res.status(400).send({type: false,err: err}) }
        else{
            res.send({type: true, result:result})
        }
    });
};
