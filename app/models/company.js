/**
 * Created by usman on 1/16/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var CompanySchema = new Schema({

    display_name: { type: String, default: '' }, //"Among Friends Adult Day Care",
    legal_name:{ type: String, null: false }, //"Among Friends Adult Day Care, Inc.",
    tin:{type: Number, null: false }, //"12-3456789",
    npi:{type: Number, null: false }, //"1571234567",
    address_1:{ type: String, null: false}, //"13333 S. Cicero Ave.",
    address_2:{ type: String, default:true}, //"",
    address_city:{ type: String, null: false}, //"Crestwood",
    address_state:{ type: String, null: false}, //"Illinois",
    address_zip:{type: Number, null: false }, //"60445",
    phone1:{type: Number, null: false }, //"7083962345",
    phone2:{type: Number, null: true }, //"7087552345",
    owner:{ type: String, null: false} //"Ralph Ditchie"
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

CompanySchema.method({

});

/**
 * Statics
 */

CompanySchema.static({

});

/**
 * Register
 */

mongoose.model('Company', CompanySchema);