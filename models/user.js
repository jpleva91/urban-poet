let mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

var User = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  songs: [{
    songId: String
  }]
});

User.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);