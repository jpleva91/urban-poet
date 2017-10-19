console.log("js loaded");

$(document).ready(function() {
    console.log("jQuery ready!");
    $('.dropdown-toggle').on('click', function() {
    	console.log("works");
    }).dropdown("toggle");
});

