var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema ({
  username: String,
  location: String
});

module.exports = mongoose.model('Location', LocationSchema);
