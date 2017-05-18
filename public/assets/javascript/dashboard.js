console.log("dashboard.js loaded");


$('.patient-button').on('click', function(event) {

	event.preventDefault();

 	var currentURL = window.location.origin;

 	var docID = $('.docid').val().trim();

 	console.log(docID);

 	$.ajax({
    url: currentURL + '/dashboard/update-patient/:id',
    type: 'PUT',
    success: function(result) {
        console.log('THE PUT WAS SUCCESSFUL');
    	}
	});



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
 		matchTxt.addClass('col-md-9').addClass('match-text');
 		matchTxt.append('<h3>' + data.first_name +' '+ data.last_name + ', '+ data.title + '</h3>');
 		matchTxt.append('<p>' + data.specialty + '</p>');
 		matchTxt.append('<p>' + '<b>Education:</b> ' + data.school + ', ' + data.degree + '</p>');
 		matchTxt.append('<p> <b>Languages:</b> ' + data.language + ' <b>Gender:</b> ' + data.gender + '</p>');
 		matchTxt.append('<p>'+ data.bio + '</p>');

 		$('.doc-results').append(matchImg).append(matchTxt);
 		
 	});

});

