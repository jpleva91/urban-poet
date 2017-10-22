console.log("JavaScript loaded");

$(document).ready(function() {
	console.log("jQuery ready");

	let inputTitle;
	let inputArtist;
	let inputSoundCloud;
	let selectedLyricsId;

	$('#searchLyrics').on('click', function(e) {
		e.preventDefault();
		console.log("Clickity");
		inputTitle = $('#inputTitle').val();		
		inputArtist = $('#inputArtist').val();
		inputSoundCloud = $('#inputSoundCloud').val();

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
				selectedLyricsId = false;
				results.forEach(function(data) {
					$('#choose-lyrics').append('<button class="btn btn-warning col-md-12 playlist" id="' + data.track_id + '"><a class="song-button" href="#">' + data.title + ' by ' + data.artist + '</a></button>');
				});
			});
			$('#songModal').modal();
		}
	});

	$('#choose-lyrics').on('click', 'button', function() {
			selectedLyricsId = $(this).attr('id');
	});	

	$('#save-song-button').on('click', function() {
		if(!selectedLyricsId) {
			alert("Please select lyrics from list");
		}
		else {
			console.log("title:", inputTitle);
			console.log("artist:", inputArtist);
			console.log("soundcloud url:", inputSoundCloud);
			console.log("selectedLyricsId:", selectedLyricsId);
			$('#songModal').modal('hide');
		}
	});


});