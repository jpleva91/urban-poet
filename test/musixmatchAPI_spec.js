const expect = require('chai').expect;
const request = require('request');
const apikey = require('../config/env.js');

let url = "http://api.musixmatch.com/ws/1.1/track.search?q_artist=gza&q_track=shadowboxing&apikey="+apikey;

// console.log("URL: ",url);

describe("Search", function() {
	var apiError, apiResponse, apiBody;
	before(function(done) {
		request(url, function(error, response, body) {
			apiError = error;
			apiResponse = response;
			apiBody = body;
			done();
		});
	});
	it("should return 200 - OK", function() {
		expect(apiResponse.statusCode).to.eq(200);
	});

	it("should have a sentence in the body", function() {
		if (typeof(apiBody) == "string") {
			apiBody = JSON.parse(apiBody);
		}
		console.log(apiBody.message.body.track_list);
		expect(apiBody).to.not.be.empty;
	});
});