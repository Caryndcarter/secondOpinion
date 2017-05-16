//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");
module.exports = function (passport) {
    router.get("/signup", function(req, res) {
        res.render("/index");
    });

    router.get("/signin", function(req, res) {
        res.render("dashboard");
    });

    router.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/");
        });
    });

    router.get("/dashboard", isLoggedIn, function(req, res) {
        res.render("dashboard");
        // console.log("Username " + req.user.username);
        console.log(req.user);
    });

    router.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/"
    }
    ));

    router.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/"
    }
    ));
    return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect("/")
}
