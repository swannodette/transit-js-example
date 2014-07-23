var transit  = require("transit-js"),
    handlers = require("./handlers");

var r = transit.reader("json", {"handlers": handlers.readHandlers});
var w = transit.writer("json", {"handlers": handlers.writeHandlers});
var data = r.read('{"~#r":"https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi"}');

console.log(w.write(data));
