console.log("JavaScript loaded");

$(document).ready(function() {
	console.log("jQuery ready");

	$('#searchLyrics').on('click', function(e) {
		e.preventDefault();
		console.log("Clickity");
		let inputTitle = $('#inputTitle').val();		
		let inputArtist = $('#inputArtist').val();
		let inputSoundCloud = $('#inputSoundCloud').val();
		console.log("title:", inputTitle);
		console.log("artist:", inputArtist);

		if(!inputTitle || !inputArtist || !inputSoundCloud) {
			alert("Please Fill Out All Fields");
		}

		else {
			$.ajax({
				type: 'post',
				url: '/lyrics',
				data: ({ title: inputTitle,
								 artist: inputArtist})
			})
			.done(function(data) {
				let results = data.results;
				$('#choose-lyrics').empty();
				results.forEach(function(data) {
					console.log("Song Id:", data.track_id);
					console.log("Song Title:", data.title);
					console.log("Song Artist:", data.artist);
					$('#choose-lyrics').append('<button class="btn btn-warning col-md-12 playlist" id="' + data.track_id + '"><a class="song-button" href="#">' + data.title + ' by ' + data.artist + '</a></button>');
					$('#choose-lyrics').on('click', 'button', function() {
						console.log($(this).attr('id'));
					});
				});
			});

			$('#songModal').modal();
		}
	});

	
});