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
            var data    = r.read(res.responseText),
                status  = data.get("statuses")[0],
                created = status.get("created_at"),
                user    = status.get("user"),
                rgb     = user.get("profile_sidebar_fill_color"),
                url     = user.get("profile_image_url");

            console.log(created.add("days", 7).format('MMMM Do YYYY, h:mm:ss a'));
            console.log(rgb.hex());
            console.log(url.protocol(), url.path());
        }
    });
})(this);
