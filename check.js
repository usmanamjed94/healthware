var bcrypt = require("bcrypt");

var password = '123456';
hashPassword(password,function(hash){
  console.log(hash);
  bcrypt.compare(password, hash, function(err,result) {
      console.log("Bcrypt returns: " + result);
    });
});

function hashPassword(password, cb) {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            var err = new Error("Error hashing password.");
            console.log(err);
            cb(null);
        } else {
            console.log(hash);
            cb(hash);
        }
    });
};
