console.log("Sanity Check: JavaScript is loaded");

$(document).ready(function() {
	console.log("jQuery has entered the match");
	randomize();
	playlist();

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

function playlist() {
	$.ajax({
		type: 'get',
		url: '/playlist'
	})
	.done(function(data) {
		data.playlist.forEach(function(song) {
			$('#dropdown').append('<button class="btn btn-warning col-md-12 playlist"><a href="#">'+song.artist + " - " + song.title + '</a></button>');
		});
	});
}

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