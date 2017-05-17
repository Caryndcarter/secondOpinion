/*===================================
	DEPENDENCIES
====================================*/

var express = require("express");
var bodyParser = require("body-parser");
var Client = require("node-rest-client").Client;
var path = require("path");
var promise = require ("promise-mysql");
var mysql = require("mysql");
var connection = ""; 


var app = express(); 
var client = new Client();

var port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

/*============================
	MySQL DATABASE CONNECTION
=============================*/

var connection = mysql.createConnection ({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "second_opinion_db"
}); 



connection.connect(function (err){

	console.log("listening");

	if (err) {
		console.log(err);
	} 	

});

/*===================================
	ALGORITHM
====================================*/

var currentDoctorId = "004a7fb7056d427ac9f9606a46e751a1";
var currentDoctorSpecialty = "";
var currentDoctorTotal = "";
var doctorsArray = []; 
var docObject = "";
var totalsArray = []; 
var potentialsArray = []; 
var matchesArray = []; 
var max = 0; 


var sqlStatement = "SELECT * FROM doctors WHERE bestdoc_id = ?";

connection.query(sqlStatement, [currentDoctorId], function (err, response) {
	if (err) {
		console.log(err); 
	} else {
		currentDoctorTotal = response[0].total;
		currentDoctorSpecialty = response[0].primary_specialty;
		createDocArray(currentDoctorSpecialty);
	}
});

 

function createDocArray (currentDoctorSpecialty) {

	var sqlStatement2 = "SELECT * FROM doctors WHERE primary_specialty = ?"; 

		connection.query(sqlStatement2, [currentDoctorSpecialty], function (err,response) {
			if (err) {
				console.log(err);
			} else {
				for (var i = 0; i < response.length; i++) {
				
				 	docObject = new Object (); 
					docObject.id = response[i].doc_id;
					docObject.bestdoc_id = response[i].bestdoc_id;
					docObject.total = response[i].total;
					
					doctorsArray.push(docObject);
				}				
			}
			doctorsSort(doctorsArray); 
		
		}); 
	
}


function doctorsSort (doctorsArray) {

	for (var i = 0; i < doctorsArray.length; i++) {
		if(currentDoctorTotal < doctorsArray[i].total && currentDoctorId !== doctorsArray[i].doc_id) {
			totalsArray.push(doctorsArray[i].total);
		}
	}

	
	getMatches(totalsArray, doctorsArray);
	
}			
	

function getMatches (totalsArray, doctorsArray) {

	for (var j = 0; j < totalsArray.length; i++) {
		
		max = Math.max(...totalsArray);

			for (var i = 0; i < doctorsArray.length; i++) {

				if(doctorsArray[i].total === max) {
					potentialsArray.push(doctorsArray[i]);
					
				}
			}	
		
		var index = totalsArray.indexOf(max); 
		totalsArray.splice(index, 1); 
		
	}

	getFinalists(potentialsArray, matchesArray); 

}

function getFinalists(potentialsArray, matchesArray) {

	for (var i = 0; i < potentialsArray.length; i++) {
	 	if (i < 6) {
			matchesArray.push(potentialsArray[i])
	 	
		}	
	}
		
	console.log(matchesArray);	
}


/* matchesArray has the top 5 matches from the database
*/


/*===================================
	LISTENER
====================================*/

app.listen(port, function() {
  console.log("App listening on PORT " + port);
});

Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help