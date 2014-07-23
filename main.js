var express  = require("express"),
    app      = express(),
    transit  = require("transit-js"),
    URI      = require("URIjs"),
    fs       = require("fs"),
    handlers = require("./handlers");

var r = transit.reader("json", {"handlers": handlers.readHandlers});
var w = transit.writer("json", {"handlers": handlers.writeHandlers});
var uri = URI("https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi");

app.get("/", function(req, res) {
    fs.readFile("index.html", "utf-8", function(err, data) {
        if(!err) {
            res.send(200, data);
        } else {
            res.send(404, "Page Not Found");
        }
    });
});

app.listen(3000);

