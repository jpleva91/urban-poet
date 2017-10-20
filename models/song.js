const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
	title: String,
	artist: String,
	soundCloudEmbedId: String,
	lyricsId: String
});

let Song = mongoose.model('Song', SongSchema);

module.exports = Song;