//Dependencies
module.exports = function(app, passport) {
    app.get("/signup", function(req, res) {
        res.render("signup");
    });

    app.get("/signin", function(req, res) {
        res.render("signup");
    });

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",

        failureRedirect: "/signup"
    }
    ));
}