var express = require("express");
var app = express();


// "/" => "Hi There!"
app.get("/", function(req, res)
    {
        res.send("Hi There!");
    });
// "/bye" => "Good bye!"
// "/dog"  => "MEOW!"
//
app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Server has started");
});

