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
app.get("/Dog" , function(req, res) {
	res.send("meow!");
});

app.get("/bye" , function(req,res) {
	res.send("Goodbye!");
});

app.get("*", function(req, res){
 	res.send("You've entered a wrong URL.");
});


app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Server has started");
});

