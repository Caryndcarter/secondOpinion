var express = require("express");
var fs = require("fs");
var Client = require("node-rest-client").Client;

var app = express(); 
var client = new Client();

var port = process.env.port || 3000;

var doctors = [];
var specialtyCount = 0;

/*===================================
	CONSTRUCTOR 
====================================*/
 function Doctor (uid, firstName, midName, lastName, title, specialty1, specialty2, practice, medSchool, residency, fellowship, pub, years, trials, stars, awards, score) {
 	this.uid = uid;
 	this.firstName = firstName;
 	this.midName = midName; 
 	this.lastName = lastName;
 	this.title = title; 
 	this.specialty1 = specialty1;
 	this.specialty2 = specialty2;
 	this.practice = practice; 
 	this.medSchool = medSchool; 
 	this.residency = residency; 
 	this.fellowship = fellowship; 
 	this.pub = pub; 
 	this.years = years; 
 	this.trials = trials; 
 	this.stars = stars; 
 	this.awards = awards; 
 	this.score = score; 
 }
 


/*===================================
	BETTER DOCTOR API
====================================*/
var specialties = [
	"cardiologist",
	"psychiatrist",
	"rheumatologist",
	"obstetrician"
];

// getDoctors("cardiologist");
// getDoctors("psychiatrist");
// getDoctors("rheumatologist");
// getDoctors("obstetrician");

function getDoctors (specialty) {
	
client.get("https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=" + specialty + "&location=42.0527550%2C-87.6776660%2C100&user_location=42.0527550%2C-87.6776660&skip=0&limit=25&user_key=d8943b3e452eb1a5bbf27cdab4f4bd92", function (data, response) {
 
    for (var i = 0; i < data.data.length; i++) {
	    var betterDoctor = new Doctor (
	    	data.data[i].uid,
	    	data.data[i].profile.first_name,
	    	data.data[i].profile.middle_name,
	    	data.data[i].profile.last_name,
	    	data.data[i].profile.title	    	
    	)

    	if (data.data[i].profile.middle_name) {
    		betterDoctor.midName = data.data[i].profile.middle_name;
    	} else {
    		betterDoctor.midName = null; 
    	}

    	if (data.data[i].profile.title) {
    		betterDoctor.title = data.data[i].profile.title;
    	} else {
    		betterDoctor.title = null; 
    	}

    	if(data.data[i].specialties) {
    		var specialities = data.data[i].specialties; 
    		betterDoctor.specialty1 = specialities[0].name;

    		for (var j = 0; j < specialities.length; j++) {
    			if (specialities[1]) {
					betterDoctor.specialty2 = specialities[1].name;
    			} else {
    				betterDoctor.specialty2 = null; 
    			}
    		}
    	 	specialtyCount ++;

	    } else {
	    	betterDoctor.specialty1 = null;
	    	betterDoctor.specialty2 = null;
	    }

	    betterDoctor.practice = Math.floor(Math.random() * 20);
	    betterDoctor.medSchool = Math.floor(Math.random() * 20);
	    betterDoctor.residency = Math.floor(Math.random() * 20);
	    betterDoctor.fellowship = Math.floor(Math.random() * 20);
	    betterDoctor.pub = Math.floor(Math.random() * 20);
	    betterDoctor.years = Math.floor(Math.random() * 20);
	    betterDoctor.trials = Math.floor(Math.random() * 20);
	    betterDoctor.stars = Math.floor(Math.random() * 20);
	    betterDoctor.awards = Math.floor(Math.random() * 20);

	   

    doctors.push(betterDoctor);
    totalScore([i]);
    log([i]);
   	
	
	}

 console.log(doctors);   
});  

}

function log(i){

		fs.appendFile("../db/doctors.csv", doctors[i].uid + "," + doctors[i].firstName + "," + doctors[i].midName + "," +
  			doctors[i].lastName + "," + doctors[i].title + "," + doctors[i].specialty1 + "," + doctors[i].specialty2 + "," + 
  			doctors[i].practice + "," + doctors[i].medSchool + "," + doctors[i].residency + "," + doctors[i].fellowship 
  			+ "," + doctors[i].pub + "," + doctors[i].years + "," + doctors[i].trials + "," + doctors[i].stars + "," + 
  			doctors[i].awards + "," + doctors[i].score + "\n", function(err) {

    	if (err) {
    	log("\n" + err);
    	console.log(err);
    	}

  	});
}


function totalScore (index) {
	for (var i = 0; i < doctors.length; i++) {
		doctors[index].score = doctors[index].practice + doctors[index].medSchool + doctors[index].residency + doctors[index].fellowship + 
		doctors[index].pub + doctors[index].years + doctors[index].trials + doctors[index].stars + doctors[index].awards; 
	}
}

/*===================================
	BETTER DOCTOR API:SPECIALTIES
====================================

This request gets all the specialties' uids and names in the system: 

client.get("https://api.betterdoctor.com/2016-03-01/specialties?user_key=d8943b3e452eb1a5bbf27cdab4f4bd92", function(data,response) {
	for (var i = data.data.length - 1; i >= 0; i--) {
		console.log(data.data[i].uid);
		console.log(data.data[i].name);
	}
	
}); 

*/

/*===================================
	BETTER DOCTOR API: COUNT DOCTORS 
	WITHIN A SPECIALTY
====================================

client.get("https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=neurologist%2C%20cardiologist%2C%20rheumatologist&location=42.0527550%2C-87.6776660%2C100&user_location=42.0527550%2C-87.6776660&skip=0&limit=500&user_key=d8943b3e452eb1a5bbf27cdab4f4bd92", function (data, response) {
	var doctorCount = 0; 

	for (var i = 0; i < data.data.length; i++) {
		if(data.data[i].specialties) {
			console.log(data.data[i].specialties[0].uid);
		} else {
			console.log("no speciality");
		}
	doctorCount ++; 
	}

	console.log(doctorCount); 

	console.log(data);
});

*/




app.listen(port, function() {
  console.log("App listening on PORT " + port);
});



