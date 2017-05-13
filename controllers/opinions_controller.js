//Dependencies
var express = require("express");
var router = express.Router();

var db = require("../models");

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
		//DOCTOR MATCH CALCULATION GOES HERE

	}).then(function(dbPatients) {
		//send the results of the doctor match as a response object


		// res.json(dbPatients);

		// res.json(dbPatients);

	});
});

router.get("/admin", function(req, res) {
	//pull all the doctor data from MySQL
	db.Doctors.findAll({
    }).then(function(dbDoctors) {
    	//Feed the relevant information into the doctor section of the  handlebars template

    	//for now, displaying a dummy page.
    	res.render('admin');

    	// res.render('admin', {doctors: results});

    	// res.json(dbDoctors);
    });

    //Pull all the patient data from MySQL
    db.Patients.findAll({
    }).then(function(dbPatients) {
    	//Feed the relevant information into the patient section of the handlebars template
    	// res.json(dbDoctors);
    });

    //keeping below for reference

    res.render("admin");
    /*
    db.Doctors.findAll({}).then(function(results) {
    	res.render("index", { burgers: results });
    });
    */

});

module.exports = router;