/**
 * Created by usman on 3/5/16.
 */


var mongoose = require('mongoose');
var Client = mongoose.model('Client');

exports.find = function(req, res){
    Client.find({}, function(err, clients){
        if(err) { res.status(400).send({err: err })}
        else{
            res.send({type: true, result: clients});
        }
    });
};
exports.findOne = function(req, res){
    Client.findById(req.params.id).populate('family').exec(function(err, client){
        if(err) { res.status(400).send({err: err })}
        else{
            res.send({type: true, result: client});
        }
    });
};

exports.update = function(req, res){
    var id= req.params.id;
    var updatePairs= req.body;
    Client.update({ _id: id}, {$set: updatePairs}, {}, function(err, result){
        if(err) { res.status(400).send({ type: false, err: err}) }
        else{
            res.send({type: true, result: result})
        }
    });
};

exports.removeClient = function(req, res){
    var id= req.params.id;
    Client.remove({ _id: id}, function(err, result){
        if(err) { res.status(400).send({type: false,err: err}) }
        else{
            res.send({type: true, result:result})
        }
    });
};

exports.create = function(req, res){
    var clientJson = req.body;
    var client = new Client(clientJson);
    client.save(function(err, result){
        if(err) { console.log(err); res.status(400).send({type: false,err: err}) }
        else{
          console.log(result);
            res.send({type: true, result:result})
        }
    });
};
