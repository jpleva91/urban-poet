const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
	title: String,
	artist: String,
	soundCloudEmbedUrl: String,
	lyricsId: String,
	comments: [{user: String, comment: String}]
});

let Song = mongoose.model('Song', SongSchema);

module.exports = Song;
module.exports.SongSchema = SongSchema;