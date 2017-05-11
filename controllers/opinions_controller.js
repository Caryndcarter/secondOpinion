//Dependencies
var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {

    res.render("index");
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