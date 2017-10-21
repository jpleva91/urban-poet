const express = require('express');
const router = express.Router();
// Parses information from POST
const bodyParser = require('body-parser');
// Used to manipulate POST methods
const methodOverride = require('method-override');
const passport = require('passport');
const usersController = require('../controllers/users');
const staticsController = require('../controllers/statics');
const songsController = require('../controllers/songs');

function authenticatedUser(req, res, next) {
	if(req.isAuthenticated()) {return next();}
	res.redirect('/login');
}

router.route('/')
	// .get(authenticatedUser, staticsController.home);
	.get(staticsController.home);

 router.route('/signup')
 	.get(usersController.getSignup)
 	.post(usersController.postSignup)

 router.route('/login')
 	.get(usersController.getLogin)
 	.post(usersController.postLogin)

 router.route('/logout')
 	.get(usersController.getLogout)

 router.route('/playlist')
 	.get(songsController.getPlaylist)
 	.post(songsController.addPlaylist)

 router.route('/randomize')
 	.get(songsController.getRandom)

module.exports = router;