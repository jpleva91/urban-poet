const expect = require('chai').expect;
const request = require('request');
const apikey = require('../config/env.js');

let searchURL = "http://api.musixmatch.com/ws/1.1/track.search?q_artist=gza&q_track=shadowboxin'&apikey="+apikey;
let trackId = "53410090";
let lyricsURL = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="+trackId+"&apikey="+apikey;

// search api function
describe("Search", function() {
	let apiError, apiResponse, apiBody;
	before(function(done) {
		request(searchURL, function(error, response, body) {
			apiError = error;
			apiResponse = response;
			apiBody = body;
			done();
		});
	});
	it("should return 200 - OK", function() {
		expect(apiResponse.statusCode).to.eq(200);
	});

	it("should return the track_id", function() {
		if (typeof(apiBody) == "string") {
			apiBody = JSON.parse(apiBody);
		}
		console.log(apiBody.message.body.track_list[0].track.track_id);
		expect(apiBody).to.not.be.empty;
	});
});

// lyrics api function
describe("Lyrics", function() {
	let apiError, apiResponse, apiBody;
	before(function(done) {
		request(lyricsURL, function(error, response, body) {
			apiError = error;
			apiResponse = response;
			apiBody = body;
			done();
		});
	});
	it("should return 200 - OK", function() {
		expect(apiResponse.statusCode).to.eq(200);
	});

	it("should return the lyrics", function() {
		if (typeof(apiBody) == "string") {
			apiBody = JSON.parse(apiBody);
		}
		console.log(apiBody.message.body.lyrics.lyrics_body);
		expect(apiBody).to.not.be.empty;
	});
});