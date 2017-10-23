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

// main page 
router.route('/')
	.get(authenticatedUser, staticsController.home)

// new route
router.route('/songs/new')
	.get(authenticatedUser, staticsController.addSong)

// user sign up
 router.route('/signup')
 	.get(usersController.getSignup)
 	.post(usersController.postSignup)

// user login
 router.route('/login')
 	.get(usersController.getLogin)
 	.post(usersController.postLogin)

// user logout
 router.route('/logout')
 	.get(usersController.getLogout)

// user playlist
 router.route('/playlist')
 	.get(songsController.getPlaylist)
 	.post(songsController.addPlaylist)

// index route
 router.route('/songs')
 	.get(songsController.getSongs)
 	.post(songsController.postSong)

// show, update, delete routes
 router.route('/songs/:id')
 	.get(songsController.getSongById)
 	.put(songsController.updateSongById)
 	.delete(songsController.deleteSongById)

// get random song
 router.route('/randomize')
 	.get(songsController.getRandom)

// get comments by id
 router.route('/comments/:id')
 	.get(songsController.getComments)

// edit, create, destroy routes
 router.route('/comments')
 	.post(songsController.postComment)
 	.put(songsController.updateComment)
 	.delete(songsController.deleteComment)

// lyrics search
 router.route('/lyrics')
 	.post(songsController.searchLyrics)

module.exports = router;