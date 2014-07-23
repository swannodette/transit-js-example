var transit = require("transit-js"),
    URI     = require("URIjs");

module.exports = {
    readHandlers: {
        "r": function(v) {
            return URI(v);
        }
    },
    writeHandlers: transit.map([
        URI, transit.makeWriteHandler({
            "tag": function(v) { return "r" },
            "rep": function(v) { return v.toString() },
            "stringRep": function(v) { return null }
        })
    ])
};
