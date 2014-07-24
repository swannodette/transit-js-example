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

    var Radius = function(n, units) {
        this.n = n;
        this.units = units | "mi";
    };

    var TwitterGeo = function(latlng, radius) {
        this.latlng = latlng;
        this.radius = radius;
    };

    // ==============================
    // Handlers

    var readHandlers = {
        "r": function(v) {
            return URI(v);
        },
        "latlng": function(v) {
            return new LatLng(v[0], v[1])
        },
        "radius": function(v) {
            return new Radius(v[0], v[1]);
        },
        "twitter/geo": function(v) {
            return new TwitterGeo(v[0], v[1]);
        }
    };

    var writeHandlers = transit.map([
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
        Radius, transit.makeWriteHandler({
            "tag": function(v) { return "radius"; },
            "rep": function(v) { return [v.n, v.units]; },
            "stringRep": function(v) { return null; }
        }),
        TwitterGeo, transit.makeWriteHandler({
            "tag": function(v) { return "twitter/geo"; },
            "rep": function(v) { return [v.latlng, v.radius]; },
            "stringRep": function(v) { return null; }
        })
    ]);

    // ==============================
    // Export

    if(typeof module != "undefined") {
        module.exports = {
            readHandlers: readHandlers,
            writeHandlers: writeHandlers
        };
    } else {
        global.transitHandlers = {
            readHandlers: readHandlers,
            writeHandlers: writeHandlers
        };
    }

})(this);
