/**
 *
 * Created by usman on 2/2/16.
 */


var mongoose = require('mongoose');
var Company = mongoose.model('Company');

exports.createCompany = function(req, res){
    var companyJson = req.body.company
    company = new Company(companyJson);
    company.save(function(err,result){
        if(err){
            console.log(err);
            res.status(501).send({type:false, err:err})
        }else{
            console.log(result);
            res.send({type:true, result:result})
        }
    });
};

exports.getCompany = function(req, res){
    var id = req.params.id;
    Company.findOne({id: id}, function(err, result){
        if(err) {
            res.status(501).send({
            type: false,
            result: err });
        }else {
            res.status(200).send({
                type: true,
                result: result
            });
        }
    });
};
