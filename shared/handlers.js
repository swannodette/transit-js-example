;(function(global) {

  if(typeof require != "undefined") {
      var transit = require("transit-js"),
          URI     = require("URIjs");
  } else {
      var transit = global.transit,
          URI     = global.URI;
  }

  var rhs = {
      "r": function(v) {
          return URI(v);
      }
  };

  var whs = transit.map([
      URI, transit.makeWriteHandler({
          "tag": function(v) { return "r" },
          "rep": function(v) { return v.toString() },
          "stringRep": function(v) { return null }
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
