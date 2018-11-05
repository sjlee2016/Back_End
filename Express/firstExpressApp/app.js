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
app.listen(3000, process.env.IP, function()
{
    console.log("Server has started");
});

