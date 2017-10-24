console.log("JavaScript loaded");

$(document).ready(function() {
	console.log("jQuery ready");

	let inputTitle;
	let inputArtist;
	let inputSoundCloud;
	let selectedLyricsId;

	$('[data-toggle="popover"]').popover();

	$('#searchLyrics').on('click', function(e) {
		e.preventDefault();
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
								 artist: inputArtist })
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
			$('#choose-lyrics').children().removeClass('toggle');
			$(this).toggleClass('toggle');
	});	

	$('#save-song-button').on('click', function() {
		if(!selectedLyricsId) {
			alert("Please select lyrics from list");
		}
		else {
			$.ajax({
				type: 'post',
				url: '/songs',
				data: ({ title: inputTitle,
							 artist: inputArtist,
							 soundcloudUrl: inputSoundCloud,
							 selectedLyricsId: selectedLyricsId })
			});

			$('#inputTitle').val('');		
			$('#inputArtist').val('');
			$('#inputSoundCloud').val('');
			$('#songModal').modal('hide');
			alert("Song Saved!");
		}
	});

});