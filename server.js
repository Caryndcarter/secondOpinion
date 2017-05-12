//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
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

//Setting up Handlebars
var exphbs = require("express-handlebars");
var helpers = require("./views/helpers")
//Adding Partial Directory
var hbs = exphbs.create({
    defaultLayout: "main",
    partialsDir: ["views/partials/"],
    helpers: helpers
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Importing routes

var routes = require("./controllers/opinions_controller.js");

app.use("/", routes);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("Server Operational - Listening to Port " + PORT);
    });
});