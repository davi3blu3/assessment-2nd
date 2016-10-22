var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var REPORTS_COLLECTION = "reports";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create database variable outside of the db connection callback to reuse the connection pool in app
var db;

// Connect to database before starting app server
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse
    db = database;
    console.log("Database connection ready");

    // Initialize the app
    var server = app.listen(process.env.PORT || 8080, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// REPORT API ROUTES BELOW

// Generic error handler for all endpoints
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/records
 *      GET: finds all reports
 *      POST: creates a new report
 */

app.get("/reports", function(req, res) {

});


app.post("/reports", function(req, res) {
    
});

/*  "/records/:id
 *      GET: find report by id
 *      PUT: update report by id
 *      DELETE: delete report by id
 */

app.get("/reports/:id", function(req, res) {

});


app.put("/reports/:id", function(req, res) {
    
});

app.delete("/reports/:id", function(req, res) {
    
});