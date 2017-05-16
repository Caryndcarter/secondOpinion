var bCrypt = require("bcrypt-nodejs");

console.log("I've been called..ze passport");

module.exports = function(passport, user) {
    var User = user || {};
    var LocalStrategy = require("passport-local").Strategy;

    passport.serializeUser(function(user, done) {
        debugger;
        done(null, user.patient_id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use("local-signup", new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },

        function(req, username, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {

                if (user) {
                    return done(null, false, {
                        message: "Email is already taken"
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: req.body.email,
                        password: userPassword,
                        username: username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };

                    User.create(data)
                    .then(function(newUser, created) {
                        debugger;
                        if (!newUser) {
                            debugger;
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    })
                    .catch(function(error) {
                        debugger;
                    });
                }
            });
        }
    ));
    //local signin
    passport.use("local-signin", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },

        function(req, username, password, done) {
            var User = user || {};
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: "Email does not exist"
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error: ", err);

                return done(null, false, {
                    message: "Something is quite not right. Please try again"
                });
            });
        }
    ));
}