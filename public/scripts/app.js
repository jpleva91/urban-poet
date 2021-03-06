console.log("Sanity Check: JavaScript is loaded");

$(document).ready(function() {

	console.log("jQuery has entered the match");
	// randomize current song
	randomize();
	// update user playlist
	playlist();
	// update comments section
	setTimeout(function() {
		getComments();
	}, 1000);

	// add song to playlist
	$('.addPlaylist').on('click', function() {
		let songId = $(this).attr('data-song-id');
		$.ajax({
			type:'post',
			url: '/playlist',
			data: {songId: songId}
		});
		$('#dropdown').empty();
		setTimeout(function() {
			playlist();
		}, 1000);
	});

	// user playlist
	$('#dropdown').on('click', '.song-button', function(e) {
		e.preventDefault();
		$.ajax({
			type: 'get',
			url: $(this).attr('href'),
		})
		.done(function(data) {
			$('.addPlaylist').attr('data-song-id', data.song._id);
			$('#post-comment').attr('data-song-id', data.song._id);
			$('#song-player').html(data.song.soundCloudEmbedUrl);
			$('#lyrics').html(data.lyrics);
			setTimeout(function() {
				getComments();
			}, 1000);
		});
		window.scrollTo(0,0);
	});

	// i'm feeling lucky button
	$('#randomize').on('click', function() {
		randomize();
		setTimeout(function() {
			getComments();
		}, 1000);
	});

	// post comment button
	$('#post-comment').on('click', function() {
		let songId = $(this).attr('data-song-id');
		let comment = $('#addComment').val();
		$.ajax({
			type: 'post',
			url: '/comments',
			data: ({ songId: songId,
							 comment: comment })
		});
		$('#addComment').val('');
		setTimeout(function() {
			getComments();
		}, 1000);
	});

	// edit & delete comments
	let commentId;
	$('.comment-section').on('click', '.edit', function() {
		commentId = $(this).attr('id');
		$('#edit-comment').val("Please Enter Your Changes or Delete Comment");
		$('#commentModal').modal();
	});

	$('#delete-comment-button').on('click', function() {
		let songId = $('#post-comment').attr('data-song-id');
		 $.ajax({
		 	type: 'delete',
		 	url: '/comments',
		 	data: ({ songId: songId,
		 				 commentId: commentId
		 				})
		 });

		setTimeout(function() {
			getComments();
		}, 1000);
		
		alert("Deleted!");
		$('#commentModal').modal('hide');
	});

	// save comment modal
	$('#save-comment-button').on('click', function() {
		let editedComment = $('#edit-comment').val();
		let songId = $('#post-comment').attr('data-song-id');
		$.ajax({
			type: 'put',
			url: '/comments',
			data:({ songId: songId,
							commentId: commentId,
							editedComment: editedComment })
		});

		setTimeout(function() {
				getComments();
		}, 1000);

		alert("Saved!");
		$('#commentModal').modal('hide');
	});
	
});


function playlist() {
	$.ajax({
		type: 'get',
		url: '/playlist'
	})
	.done(function(data) {
		data.playlist.forEach(function(song) {
			$('#dropdown').append('<button class="btn btn-warning col-md-12 playlist"><a class="song-button" href=/songs/'+ song._id + '>' + song.artist + ' - ' + song.title + '</a></button>');
		});
	});
}

function randomize() {
	$.ajax({
	type: 'get',
	url: '/randomize'
	})
	.done(function(data) {
		$('.addPlaylist').attr('data-song-id', data.song._id);
		$('#post-comment').attr('data-song-id', data.song._id);
		$('#song-player').html(data.song.soundCloudEmbedUrl);
		$('#lyrics').html(data.lyrics);
	});
	window.scrollTo(0,0);
}

function getComments() {
	let songId = $('.addPlaylist').attr('data-song-id');
	$.ajax({
		type: 'get',
		url: '/comments/' + songId
	})
	.done(function(data) {
		$('.comment-section').empty();
		let currentUser = data.currentUser;
		data.song.comments.forEach(function(data) {
			if(currentUser == data.user) {
				$('.comment-section').append('<h3 class="user">' + data.user + '          ' + '<button class="btn btn-warning edit" id="' + data._id + '">Edit Comment</button></h3>');
				$('.comment-section').append('<li class="content-box" id="comment">' + data.comment + '</li>');
			}
			else {
				$('.comment-section').append('<h3 class="user">' + data.user + '</h3>');
				$('.comment-section').append('<li class="content-box" id="comment">' + data.comment + '</li>');
			}
		});
	});
}