;(function(global) {

    if(typeof require != "undefined") {
        var transit = require("transit-js"),
            URI     = require("URIjs"),
            color   = require("onecolor"),
            moment  = require("moment");
    } else {
        var transit = global.transit,
            URI     = global.URI,
            color   = global.one.color,
            moment  = global.moment;
    }

    // ==============================
    // App domain types

    var LatLng = function(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    };

    var GeoPoint = function(coordinates) {
        this.coordinates = coordinates;
    };

    // ==============================
    // Handlers

    var readHandlers = {
        "m": function(v) {
            return moment(v);
        },
        "r": function(v) {
            return URI(v);
        },
        "latlng": function(v) {
            return new LatLng(v[0], v[1])
        },
        "color/rgb": function(v) {
            return color(v);
        },
        "geo/point": function(v) {
            return new GeoPoint(v);
        }
    };

    var writeHandlers = transit.map([
        moment().constructor, transit.makeWriteHandler({
            "tag": function(v) { return "m"; },
            "rep": function(v) { return v.valueOf().toString(); },
            "stringRep": function(v, h) { return h.rep(v); }
        }),
        URI, transit.makeWriteHandler({
            "tag": function(v) { return "r"; },
            "rep": function(v) { return v.toString(); },
            "stringRep": function(v) { return null; }
        }),
        color.RGB, transit.makeWriteHandler({
            "tag": function(v) { return "color/rgb"; },
            "rep": function(v) { return v.hex(); },
            "stringRep": function(v, h) { return h.rep(v); }
        }),
        LatLng, transit.makeWriteHandler({
            "tag": function(v) { return "geo/latlng"; },
            "rep": function(v) { return [v.lat, v.lng]; },
            "stringRep": function(v) { return null; }
        }),
        GeoPoint, transit.makeWriteHandler({
            "tag": function(v) { return "geo/point"; },
            "rep": function(v) { return v.coordinates; },
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
