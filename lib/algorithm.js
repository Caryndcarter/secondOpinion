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
var currentDoctorTotal = "";
var doctorsArray = []; 
var docObject = "";
var potentialsArray = []; 
var matchesArray = []; 


var sqlStatement = "SELECT * FROM doctors WHERE bestdoc_id = ?";

connection.query(sqlStatement, [currentDoctorId], function (err, response) {
	if (err) {
		console.log(err); 
	} else {
		currentDoctorTotal = response[0].total;

	}
});

createDocArray(); 

function createDocArray () {

	var sqlStatement2 = "SELECT * FROM doctors WHERE doc_id = ?"; 

	for (var i = 1; i < 101; i++) {

		connection.query(sqlStatement2, [i], function (err,response) {
			if (err) {
				console.log(err);
			} else {
			 	docObject = new Object (); 
				docObject.id = response[0].doc_id;
				docObject.bestdoc_id = response[0].bestdoc_id;
				docObject.total = response[0].total;
				console.log(docObject); 
				doctorsArray.push(docObject);				
			}

		
		}); 



	}
	showArray(); 
	
}


function showArray () {
	console.log(doctorsArray);
}			
				
// console.log("hello");

// var yeses = 0; 


// for (var i = 0; i < doctorsArray.length; i++) {
// 	if (currentDoctorTotal < doctorsArray[i].total) {
// 			yeses ++; 

			
// 			// potentialsArray.push(doctorsArray[i]);
// 		}

// }
// console.log(yeses);
// console.log(potentialsArray);


/* Phase 1: grab currentDoctor's total score and put it into a variable
get all doctors out of the db, put them into the doctorsArray
then iterate over those and find the ones that have a total score more than the current doctor's total score
take the ones that have a score higher than the currentdoctor and move them into the potentialsArray
*/


/*===================================
	LISTENER
====================================*/

app.listen(port, function() {
  console.log("App listening on PORT " + port);
});

