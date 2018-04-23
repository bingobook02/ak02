var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  password: String,
  location1: String,
  location2: String,
  location3: String,
  location4: String,
  location5: String,
  location6: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
