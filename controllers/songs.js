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

// POST /songs
function postSong(req, res, next) {
	console.log("postSong: controller hit");
	// console.log(req.body);
	let newSong = new db.Song({
		title: req.body.title,
		artist: req.body.artist,
		soundCloudEmbedUrl: req.body.soundcloudUrl,
		lyricsId: req.body.selectedLyricsId
	});

	newSong.save(function(err, song) {
		if (err) {
			return console.log("save error: " + err);
		}
		console.log("saved ", song.title);
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

// GET /comments/:id
function getComments(req, res, next) {
	console.log("getComments: controller hit");
	db.Song.findOne({_id: req.params.id}, function(err, foundSong) {
		res.json({ currentUser: req.user.local.email,
							 song: foundSong});
	});
}

// POST /comments
function postComment(req, res, next) {
	console.log("postComment: controller hit");
	db.Song.findOneAndUpdate({_id: req.body.songId}, {'$push': {'comments': {'user': req.user.local.email, 'comment': req.body.comment}}}, function(err, foundSong){
	});
}

// PUT /comments
function updateComment(req, res, next) {
	console.log("editComment: controller hit");
	console.log("SongId:", req.body.songId);
	console.log("CommentId:", req.body.commentId);
	console.log("Edited Comment:", req.body.editedComment);
	 db.Song.findOne({_id: req.body.songId}, function(err, foundSong) {
	 	foundSong.comments.forEach(function(data) {
	 		if(data._id == req.body.commentId){
	 			data.comment = req.body.editedComment;
	 		}
	 	});
	 	foundSong.save();
	 });
}

// DELETE /comments
function deleteComment(req, res, next) {
	console.log("deleteComment: controller hit");
	db.Song.findOne({_id: req.body.songId}, function(err, foundSong) {
	 	foundSong.comments.forEach(function(data) {
	 		if(data._id == req.body.commentId){
	 			let index = foundSong.comments.indexOf(data);
	 			foundSong.comments.splice(index, 1);
	 		}
	 	});
	 	foundSong.save();
	});
}


// POST /lyrics
function searchLyrics(req, res, next) {
	console.log("searchLyrics: controller hit");
	let artist = req.body.artist;
	let track = req.body.title;
	let URL ="http://api.musixmatch.com/ws/1.1/track.search?q_artist=" + artist + "&q_track=" + track  + "&apikey=" + apikey;
	request(URL, function(error, response, body) {
		if (error) { console.log('error:', error); }
		console.log('statusCode:', response && response.statusCode);
		body = JSON.parse(body);
		let foundTracks = body.message.body.track_list;
		let results = [];
		foundTracks.forEach(function(data) {
			console.log(data.track.track_name);
			console.log(data.track.artist_name);
			console.log(data.track.track_id);
			results.push({	title: data.track.track_name,
									artist: data.track.artist_name,
									track_id: data.track.track_id	});
		});
		res.json({results: results});
	});
}


module.exports = {
	getPlaylist: getPlaylist,
	addPlaylist: addPlaylist,
	getSongs: getSongs,
	postSong: postSong,
	getSongById: getSongById,
  getRandom: getRandom,
  getComments: getComments,
  postComment: postComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
  searchLyrics: searchLyrics
};