let db = require('./models/index');

let songs_list = [
	{
		title: 'Man of the Year',
		artist: 'Logic',
		soundCloudEmbedUrl: '<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/91168184&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>',
		lyricsId: '15953433'
	}

	db.Song.remove({},)
];