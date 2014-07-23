(function(global) {
    var j  = global.jQuery,
        _  = global._,
        t  = global.transit,
        th = global.transitHandlers,
        r  = transit.reader("json", {
                 handlers: _.extend(th.readHandlers, {
                     "m": function(v) {
                         return global.moment(parseInt(v,10));
                     }
                 })
             });

    j.get("json", function(data) {
        console.log(data);
    });

    j.ajax({
        type: "GET",
        url: "transit",
        complete: function(res) {
            var data = r.read(res.responseText),
                date = data.get("results")[0].get("created_at");
            console.log(date.add("days", 7).format('MMMM Do YYYY, h:mm:ss a'));
        }
    });
})(this);
