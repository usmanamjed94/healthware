/**
 * Created by usman on 3/9/16.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// npm install git://github.com/RGBboy/mongoose-validate.git
var validate = require('mongoose-validate');

var Family = new Schema({

    fam_fname: { type: String, required: true },
    fam_lname: { type: String, required: true },
    fam_address_street: { type: String, required: true },
    fam_address_street2: { type: String, required: true },
    fam_address_city: { type: String, required: true },
    fam_address_state: { type: String, required: true },
    fam_relationship: { type: String, required: true },
    fam_company: { type: String, required: true },
    fam_department: { type: String, required: true },
    fam_workphone: { type: String, required: true },
    fam_homephone: { type: String, required: true },
    fam_cellphone: { type: String, required: true },
    fam_email: { type: String, required: true, null: true, validate: [validate.email, 'invalid email address'] },
    fam_notes: { type: String, required: true },
    parent_id: {type: Schema.Types.ObjectId, ref: 'Client'},
    co_id: {type: Schema.Types.ObjectId, null:true} /* the company they are associated with */

});

mongoose.model('family', Family);
