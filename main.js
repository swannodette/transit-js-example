var t    = require("transit-js"),
    url  = require("url"),

var r = t.reader("json", {"handlers": rhs});
var w = t.writer("json", {"handlers": whs});
var data = r.read('{"~#r":"https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi"}');



//console.log(w.write(data));
