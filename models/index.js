const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI ||
									process.env.MONGOLAB_URI ||
									process.env.MONGOHQ_URL ||
									"mongodb://localhost/urban-poets");

module.exports.Song = require('./song.js');
module.exports.User = require('./user.js');