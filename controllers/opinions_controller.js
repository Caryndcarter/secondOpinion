//Dependencies
var express = require("express");
var router = express.Router();
var Client = require("node-rest-client").Client;

var db = require("../models");

var client = new Client();

//Router to render the index page
router.get("/", function(req, res) {
    res.render("index");
});

//Router to update the current doctor and diagnosis for the logged in patient
router.put("/dashboard/update-patient/:id", function(req, res) {
	// console.log(req.body);

	db.Patients.update({

		current_doctor: req.body.current_doctor,
		diagnosis: req.body.diagnosis
	}, {
        where: {
            patient_id: req.params.id
        }
    }).then(function(dbPatients) {
		//send the results of the doctor match as a response object

		res.json(dbPatients);

	});
});

//Router to get the admin page. Checks if you are an admin before rendering. If you aren't render the 404 page. 
//If admin, have sequelize grabs all the doctor and patient data and renders the admin page with the following datasets
router.get("/admin", isLoggedIn, function(req, res) {
    //Updated Admin block, you can only use one res.render per block
    //Have to do the second query in a callback from the initial callback
    if (req.user.isAdmin) {
        db.Doctors.findAll({}).then(function(doctorData) {
            db.Patients.findAll({}).then(function(patientsData) {
                // console.log(patientsData);
                res.render("admin", {
                    isAdmin: patientsData,
                    doctors: doctorData,
                    patients: patientsData
                });
            });
        });
    } else {
        res.render("404");
    }
});

//Router to update to add an admin based on the current Patients table
router.put("/admin/add-admin/:id", function(req, res) {
    // console.log(req.body);
    // console.log(req.body.id);
    db.Patients.update({
        isAdmin: req.body.isAdmin
        }, {
        where: {
            patient_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    });
});

//Router to "delete" a patient from the current Patient table
router.put("/admin/remove-patient/:id", function(req, res) {
    // console.log(req.body);
    // console.log(req.body.id);
    db.Patients.update({
        removed: req.body.removed
        }, {
        where: {
            patient_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    });
});

//Router to "delete" a doctor from the current Doctors table
router.put("/admin/remove-doc/:id", function(req, res) {
    // console.log(req.body);
    // console.log(req.body.id);
    db.Doctors.update({
        removed: req.body.removed
        }, {
        where: {
            doc_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    });
});

//Router to remove an admin based on the current Patients table
router.put("/admin/remove-admin/:id", function(req,res) {
    db.Patients.update({
        isAdmin: req.body.isAdmin
    }, {
        where:{
            patient_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    })
})

//Router to render all of the available doctrocs on the docs page
router.get("/docs", function(req, res) {
    db.Doctors.findAll({}).then(function(results) {
        res.render("docs", { doctors: results });
    });
});

router.get("/about", function(req, res) {
    res.render("about");
});

//receives the UID and calls getBestDoc function to do API call and get profile of doctor and send the response back
router.get("/bestdoctor/:uid", function(req, res) {
    var uid = req.params.uid;
    getBestDoc(uid, function(data) {
        res.json(data);
        // res.render("/dashboard", { bestdoctors: data });
    });
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

//Checks to see if a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect("/")
}

module.exports = router;