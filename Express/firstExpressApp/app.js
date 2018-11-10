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
app.get("/bye", function(req, res) {
    res.send("Good bye!");
});


app.get("/Dog", function(req,res) {
    res.send("Meow!");
});


app.listen(3000, process.env.IP, function()
{
    console.log("Server has started");
});

