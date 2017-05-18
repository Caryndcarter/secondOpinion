console.log("dashboard.js loaded");

$('.patient-button').on('click', function(event) {
	event.preventDefault();

 	var currentURL = window.location.origin;

 	var docID = $('.docid').val().trim();

 	console.log(docID);



 	$.post(currentURL + '/dashboard/matches', {'id': docID}, function(data) {
 		console.log(docID);

 		var matchImg = $('<div></div>');

 		matchImg.addClass('col-md-3');

 		var matchTxt = $('')

 		$('.doc-results').html();


 		
 	});

});

