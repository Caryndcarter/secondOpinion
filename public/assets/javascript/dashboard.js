console.log("dashboard.js loaded");

$('.patient-button').on('click', function(event) {
	event.preventDefault();

 	var currentURL = window.location.origin;

 	var docID = $('.docid').val().trim();

 	console.log(docID);



 	$.post(currentURL + '/dashboard/matches', {'id': docID}, function(data) {
 		// console.log('this is the data: ' + data);

 		// var matchImg = $('<div></div>');
 		// matchImg.addClass('col-md-3').addClass('match-image');
 		// matchImg.append('<img src="/assets/catscan.jpg">');

 		// var matchTxt = $('<div></div>');
 		// matchTxt.addClass('col-md-9');
 		// matchTxt.append('<h3>' + 'CHECK OUT THIS DOCTOR' + '</h3>');
 		// matchTxt.append(data);

 		var matchImg = $('<div></div>');
 		matchImg.addClass('col-md-3').addClass('match-image');
 		matchImg.append('<img src="'+ data.image +'">');

 		var matchTxt = $('<div></div>');
 		matchTxt.addClass('col-md-9');
 		matchTxt.append('<h3>' + data.first_name +' '+ data.last_name+ ', '+ data.title'</h3>');
 		matchTxt.append('<p>'+ 'Specialty: ' + data.specialty + ' Languages Spoken: ' data.language + ' Gender: ' + data.gender + ' Education: ' + data.school + data.degree +'</p>');

 		matchTxt.append('<p>'+ data.bio + '</p>');

 		$('.doc-results').append(matchImg).append(matchTxt);
 		
 	});

});

