var fs       = require("fs"),
    transit  = require("transit-js"),
    handlers = require("./shared/handlers"),
    w        = transit.writer("json", {"handlers": handlers.writeHandlers});
    express  = require("express"),
    app      = express(),
    fakeApi  = require("./fake_api"),

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
    res.send(200, JSON.stringify(fakeApi.JSON_RESULTS));
});

app.get("/transit", function(req, res) {
    res.setHeader("Content-Type", "application/transit+json");
    res.send(200, w.write(fakeApi.TRANSIT_RESULTS));
});

app.listen(3000);

