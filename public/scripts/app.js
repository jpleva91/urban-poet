console.log("Sanity Check: JavaScript is loaded");
$(document).ready(function() {
	console.log("jQuery has entered the match");

	$('#randomize').on('click', function() {
		console.log('clickity');
		$.ajax({
			type: 'get',
			url: '/randomize'
		})
		.done(function(data) {
			$('#song-player').html(data.song.soundCloudEmbedUrl);
			$('#lyrics').html(data.lyrics);
		});
	});
});