// GET /
function home(req, res) {
	res.render('musicPage');
}

module.exports = {
	home: home,
};