(function(g) {
    var j   = g.jQuery,
        h   = g.transitHandlers,
        rdr = g.transit.reader("json", {handlers: h.readHandlers});

    // Reading transit, values are already the types your team expects
    // just start programming

    function parseTransitStatus(status) {
        var user = status.get("user");
        return {
            weekLater: status.get("created_at").add("days", 7),
            color: user.get("profile_sidebar_fill_color").cmyk(),
            url: user.get("profile_image_url").path()
        };
    };

    j.ajax({
        type: "GET",
        url: "transit",
        complete: function(res) {
            var data = rdr.read(res.responseText),
                xs   = data.get("statuses").map(parseTransitStatus);
            console.log(xs);
        }
    });

    // Reading JSON, you always need to remember exactly what to hydrate
    // to which types your team has agreed upon

    function parseJSONStatus(status) {
        var user = status["user"];
        return {
            weekLater: new Date(status["created_at"]).add("days", 7), // OOPS!!!
            color: one.color(user["profile_sidebar_fill_color"]).cmyk(),
            url: URI(user["profile_image_url"]).path() 
        };
    }

    j.get("json", function(data) {
        var xs = data["statuses"].map(parseJSONStatus);
        console.log(xs);
    });

})(this);
