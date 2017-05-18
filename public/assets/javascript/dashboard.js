console.log("dashboard.js loaded");

$('.patient-button').on("click", function(event) {
	event.preventDefault();

 	var currentURL = window.location.origin;

 	var docID = $('#doctor').val().trim();

 	$.post(currentURL + '/dashboard/matches', docID, function(data) {

 		$('.doc-results').html();

 	});

});

