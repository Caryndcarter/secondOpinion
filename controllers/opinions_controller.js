//Dependencies
var express = require("express");
var router = express.Router();
var Client = require("node-rest-client").Client;

var db = require("../models");

var client = new Client();

router.get("/", function(req, res) {
    res.render("index");
});

router.post("/", function(req, res) {
	// console.log(req.body);
	db.Patients.create({
		name: req.body.patient_name,
		email: req.body.email,
		current_doctor: req.body.current_doctor,
		diagnosis: req.body.diagnosis

	}).then(function(dbPatients) {
		//send the results of the doctor match as a response object

		res.json(dbPatients);

	});
});


router.get("/admin", isLoggedIn, function(req, res) {
    //Updated Admin block, you can only use one res.render per block
    //Have to do the second query in a callback from the initial callback
    if (req.user.isAdmin) {
        db.Doctors.findAll({}).then(function(doctorData) {
            db.Patients.findAll({}).then(function(patientsData) {
                console.log(patientsData);
                res.render("admin", {
                    isAdmin: patientsData,
                    doctors: doctorData,
                    patients: patientsData
                });
            });
        });
    } else {
        res.render("/");
    }
});


router.get("/docs", function(req, res) {
    db.Doctors.findAll({}).then(function(results) {
        res.render("docs", { doctors: results });
    });
})

//receives the UID and calls getBestDoc function to do API call and get profile of doctor and send the response back
router.get("/bestdoctor/:uid", function(req, res) {
    var uid = req.params.uid;
    getBestDoc(uid, function(data) {
        res.json(data)
    })
});

//API call
function getBestDoc(uid, cb) {
    client.get("https://api.betterdoctor.com/2016-03-01/doctors/"+uid+"?user_key=d8943b3e452eb1a5bbf27cdab4f4bd92", function (data, res) {
        cb(data);
    })
}



	//pull all the doctor data from MySQL
    	//Feed the relevant information into the doctor section of the  handlebars template
    	//for now, displaying a dummy page.
    	// res.render('admin', {doctors: results});
    //Pull all the patient data from MySQL
    	//Feed the relevant information into the patient section of the handlebars template
    	// res.json(dbDoctors);
    //keeping below for reference
    // res.render("admin");

   function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect("/")
}



module.exports = router;