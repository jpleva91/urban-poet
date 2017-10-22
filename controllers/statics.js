// GET /
function home(req, res, next) {
	res.render('musicPage');
}

function addSong(req, res, next) {
	res.render('addSong');
}

module.exports = {
	home: home,
	addSong: addSong
};