console.log("Sanity Check: JavaScript is loaded");

$(document).ready(function() {
	console.log("jQuery has entered the match");
	randomize();

	$('.addPlaylist').on('click', function() {
		let songId = $(this).attr('data-song-id');
		$.ajax({
			type:'post',
			url: '/playlist',
			data: {songId: songId}
		});
	});

	$('#randomize').on('click', function() {
		randomize();
	});
});

function randomize() {
	$.ajax({
	type: 'get',
	url: '/randomize'
	})
	.done(function(data) {
		// console.log(data);
		$('.addPlaylist').attr('data-song-id', data.song._id);
		$('#song-player').html(data.song.soundCloudEmbedUrl);
		$('#lyrics').html(data.lyrics);
	});
}