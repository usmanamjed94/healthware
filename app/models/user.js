/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
// npm install git://github.com/RGBboy/mongoose-validate.git
var validate = require('mongoose-validate')

/**
 * User schema
 */

var UserSchema = new Schema({
  //  Account
  uname: { type: String, default: '' },
  email: { type: String, unique: true, required: true, validate: [validate.email, 'invalid email address'] },
  role: {type: Number, required: true}, /* this will be defined in a different table the numer here will go to a specific permission set */
  m_id: { type: String },   /*"00001", mobile login for easier access */
  m_pin: { type: String },  /*"1234" mobile "password" pin  */
  //  Account
  //  Personal
  usr_fname: { type: String, required: true },
  usr_mname: { type: String, required: true },
  usr_lname: { type: String, required: true },
  usr_prefname: { type: String, required: true },
  usr_address_street: { type: String, required: true },
  usr_address_street2: { type: String, required: true },
  usr_address_city: { type: String, required: true },
  usr_address_state: { type: String, required: true },
  usr_address_zip: { type: String, required: true },
  usr_phone1: { type: String, required: true },
  usr_phone2: { type: String, required: true },
  usr_status: { type: String, required: true },
  //  Personal
  //  Family
  family: [{type: Schema.Types.ObjectId, ref: 'family'}],
  //  Family
  //  911 Emergency
  usr_911_fname : { type: String },
  usr_911_lname : { type: String },
  usr_911_address1 : { type: String },
  usr_911_company : { type: String },
  usr_911_department : { type: String },
  usr_911_workphone : { type: String },
  //  911 Emergency
  //  Skillset
  //  Skillset
  //  Schedule
  usr_sch_mondaystart: { type: String },
  usr_sch_mondayend: { type: String },
  usr_sch_tuesdaystart: { type: String },
  usr_sch_tuesdayend: { type: String },
  usr_sch_wednesdaystart: { type: String },
  usr_sch_wednesdayend: { type: String },
  usr_sch_thursdaystart: { type: String },
  usr_sch_thursdayend: { type: String },
  usr_sch_fridaystart: { type: String },
  usr_sch_fridayend: { type: String },
  usr_sch_saturdaystart: { type: String },
  usr_sch_saturdayend: { type: String },
  usr_sch_sundaystart: { type: String },
  usr_sch_sundayend: { type: String },
  usr_sch_mrassessment: { type: String },
  usr_sch_comments: { type: String },
  usr_sch_ccpunitsperday: { type: String },
  usr_sch_ccpdaysperweek: { type: String },
  usr_sch_ccpunitsperweek: { type: String },
  usr_sch_unitspermonth: { type: String },
  usr_sch_totalincome: { type: String },
  usr_sch_familysize: { type: String },
  usr_sch_donscore: { type: String },
  usr_sch_feeschedule: { type: String },
  usr_sch_maximumcopay: { type: String },
  usr_sch_otherservicecost: { type: String },
  //  Schedule
  co_id: {type: Schema.Types.ObjectId, null:true}, /* the company they are associated with */
  token: {type:String, null: false, select: true},
  hashed_password: {type: Schema.Types.Mixed, null:false, trim:false, select: false},
  resetPasswordToken: {type:String, null: false, select: true},
  resetTokenExpires: {type:Date, select: true}
});

/**
 * hook a pre save method to hash the password
 */


/**
 * methods
 */

UserSchema.method({

});


/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
