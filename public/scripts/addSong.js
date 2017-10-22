console.log("JavaScript loaded");

$(document).ready(function() {
	console.log("jQuery ready");

	$('#searchLyrics').on('click', function(e) {
		e.preventDefault();
		console.log("Clickity");
		$('#songModal').modal();
		let inputTitle = $('#inputTitle').val();		
		let inputArtist = $('#inputArtist').val();
		let inputSoundCloud = $('#inputSoundCloud').val();
	});
});