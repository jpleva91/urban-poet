const db = require('../models');
let request = require('request');
const apikey = require('../config/env.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// GET /playlist
function getPlaylist(req, res, next) {
	console.log("getPlaylist: controller hit");
	let promise = db.Song.find({ _id: { $in: req.user.songs}}).exec();
	promise.then(function(playlist) {
		console.log(playlist);
		res.json({playlist: playlist});
	});
}

// POST /playlist
function addPlaylist(req, res, next) {
	console.log("add Playlist: controller hit");
	req.user.songs.push(req.body.songId);
	req.user.save();
}

// GET /songs
function getSongs(req, res, next) {
	console.log("getSongs: controller hit");
	db.Song.find({}, function(err, songs) {
		res.json(songs);
	});
}

// GET /songs/:id
function getSongById(req, res, next) {
	console.log("getSongById: controller hit");
	// console.log(req.params.id);
	db.Song.findOne({_id: req.params.id}, function(err, foundSong) {
		let track_id = foundSong.lyricsId;
		let URL = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + track_id + "&apikey=" + apikey;
		request(URL, function(error, response, body) {
			if (error) { console.log('error:', error); }
			console.log('statusCode: ', response && response.statusCode);
			body = JSON.parse(body);
			let lyrics = body.message.body.lyrics.lyrics_body;
			res.json({song: foundSong, lyrics: lyrics});
		});
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
			if (error) { console.log('error:', error); }
			console.log('statusCode:', response && response.statusCode);
			body = JSON.parse(body);
			let lyrics =  body.message.body.lyrics.lyrics_body;
			res.json({song: songs[randomize], lyrics: lyrics});
		});
	});
}

// GET /comments
function getComments(req, res, next) {
	console.log("getComments: controller hit");
	console.log(req.params);
	db.Song.findOne({_id: req.params.id}, function(err, foundSong) {
		res.json({song: foundSong});
	});
}

// POST /comments
function postComment(req, res, next) {
	console.log("postComment: controller hit");
	db.Song.findOneAndUpdate({_id: req.body.songId}, {'$push': {'comments': {'user': req.user.local.email, 'comment': req.body.comment}}}, function(err, foundSong){
	});
}


module.exports = {
	getPlaylist: getPlaylist,
	addPlaylist: addPlaylist,
	getSongs: getSongs,
	getSongById: getSongById,
  getRandom: getRandom,
  getComments: getComments,
  postComment: postComment
};