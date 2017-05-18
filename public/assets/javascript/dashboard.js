console.log("dashboard.js loaded");

$('.patient-button').on('click', function(event) {
	event.preventDefault();

 	var currentURL = window.location.origin;

 	var docID = $('.docid').val().trim();

 	console.log(docID);

 	$.post(currentURL + '/dashboard/matches', docID, function(data) {

 		// var matchimg = $('<div></div>');

 		// matchimg.addClass('col-md-3');


 		// var matchtxt = $('')

 		// $('.doc-results').html();


 		console.log(docID);
 	});

});

