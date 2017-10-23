// GET /
function home(req, res, next) {
	res.render('musicPage');
}

// GET /songs/new
function addSong(req, res, next) {
	res.render('addSong');
}

module.exports = {
	home: home,
	addSong: addSong
};