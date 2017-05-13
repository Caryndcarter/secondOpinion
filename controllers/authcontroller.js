//Dependencies
module.exports = function(app, passport) {
    app.get("/signup", function(req, res) {
        res.render("signup");
    });

    app.get("/signin", function(req, res) {
        res.render("signup");
    });

    app.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/");
        });
    });

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/signup"
    }, function(req, res) {
        res.redirect("/");
    }
    ));
}