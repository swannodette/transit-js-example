;(function(global) {

    if(typeof require != "undefined") {
        var transit = require("transit-js"),
        URI     = require("URIjs");
    } else {
        var transit = global.transit,
        URI     = global.URI;
    }

    // ==============================
    // App domain types

    var LatLng = function(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    };

    var TwitterGeo = function(latlng, radius) {
        this.latlng = latlng;
        this.radius = radius;
    };

    // ==============================
    // Read Handlers

    var rhs = {
        "r": function(v) {
            return URI(v);
        },
        "latlng": function(v) {
            return new LatLng(v[0], v[1])
        },
        "twitter/geo": function(v) {
            return new TwitterGeo(v[0], v[1]);
        }
    };

    // ==============================
    // Write Handlers

    var whs = transit.map([
        URI, transit.makeWriteHandler({
            "tag": function(v) { return "r"; },
            "rep": function(v) { return v.toString(); },
            "stringRep": function(v) { return null; }
        }),
        LatLng, transit.makeWriteHandler({
            "tag": function(v) { return "latlng"; },
            "rep": function(v) { return [v.lat, v.lng]; },
            "stringRep": function(v) { return null; }
        }),
        TwitterGeo, transit.makeWriteHandler({
            "tag": function(v) { return "twitter/geo"; },
            "rep": function(v) { return [v.latlng, v.radius]; },
            "stringRep": function(v) { return null; }
        })
    ]);

    if(typeof module != "undefined") {
        module.exports = {
            readHandlers: rhs,
            writeHandlers: whs
        };
    } else {
        global.transitHandlers = {
            readHandlers: rhs,
            writeHandlers: whs
        };
    }

})(this);
