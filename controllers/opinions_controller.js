//Dependencies
var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/signup", function(req, res) {
    res.render("login");
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



	});
});

router.get("/admin", function(req, res) {
    res.render("admin");
    /*
    db.Doctors.findAll({}).then(function(results) {
    	res.render("index", { burgers: results });
    });
    */



});

module.exports = router;