var path = require("path");
var db = require("../models");

module.exports = function (algorithm) {

    var currentDoctorId = "004a7fb7056d427ac9f9606a46e751a1";
    var currentDoctorSpecialty = "";
    var currentDoctorTotal = "";
    var doctorsArray = []; 
    var docObject = "";
    var totalsArray = []; 
    var potentialsArray = []; 
    var matchesArray = []; 
    var bestMatch = ""; 
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
        
        bestMatch = matchesArray[0];   
        console.log(matchesArray);  
    }

}

