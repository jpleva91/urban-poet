const db = require('../models');
let request = require('request');
const apikey = require('../config/env.js');

// POST /playlist
function addPlaylist(req, res, next) {
	console.log("add Playlist: controller hit");
	db.User.findOne({'songs': { 'songId': req.body.songId } }, function(err, song) {
		console.log(req.body.songId);
		req.user.songs.push(req.body.songId);
		req.user.save();
	});
}

// GET /randomize
function getRandom(req, res, next) {
	 console.log("getRandom: controller hit");
	db.Song.find({}, function(err, songs) {
		let randomize = Math.floor(Math.random() * songs.length);
		let track_id = songs[randomize].lyricsId;
		let URL = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + track_id + "&apikey=" + apikey;
		request(URL, function(error, response, body) {
			console.log('error:', error);
			console.log('statusCode:', response && response.statusCode);
			body = JSON.parse(body);
			let lyrics =  body.message.body.lyrics.lyrics_body;
			res.json({song: songs[randomize], lyrics: lyrics});
		});
	});
}


module.exports = {
	addPlaylist: addPlaylist,
  getRandom: getRandom
};