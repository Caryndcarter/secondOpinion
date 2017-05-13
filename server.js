//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 2012;

//Serve static content from public directory
app.use(express.static(process.cwd() + "/public"));
app.use(methodOverride("_method"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());//persistent login

//Setting up Handlebars
var exphbs = require("express-handlebars");
var helpers = require("./views/helpers");
//Adding Partial Directory
var hbs = exphbs.create({
    defaultLayout: "main",
    partialsDir: ["views/partials/"],
    helpers: helpers
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Importing routes
var opinions = require("./controllers/opinions_controller.js");
var auth = require("./controllers/authcontroller.js")(app, passport);
// debugger;
// db.User.findOne({
//     where: {id: 1}
// }).then(function(result) {
//     console.log("NO IDEA");
// });
require("./config/passport.js")(passport, db.User);

app.use("/", opinions);


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("Server Operational - Listening to Port " + PORT);
    });
});