var express  = require("express"),
    app      = express(),
    transit  = require("transit-js"),
    URI      = require("URIjs"),
    fs       = require("fs"),
    handlers = require("./shared/handlers"),
    jsonRes  = require("./fake_api").JSON_RESULTS,
    transitRes = require("./fake_api").TRANSIT_RESULTS;

var w = transit.writer("json", {"handlers": handlers.writeHandlers});

app.use(express.static(__dirname, + "/bower_components"));
app.use(express.static(__dirname, + "/shared"));
app.use(express.static(__dirname, + "/client"));

app.get("/", function(req, res) {
    fs.readFile("index.html", "utf-8", function(err, data) {
        if(!err) {
            res.send(200, data);
        } else {
            res.send(404, "Page Not Found");
        }
    });
});

app.get("/json", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(200, JSON.stringify(jsonRes));
});

app.get("/transit", function(req, res) {
    res.setHeader("Content-Type", "application/transit+json");
    res.send(200, w.write(transitRes));
});

app.listen(3000);

