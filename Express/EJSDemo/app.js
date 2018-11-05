var express = require("express");
var app = express();

app.get("/", function(req, res) {
 //  res.send("<h1> welcome to the home page <h1>"); 
 res.render("home.ejs");
});

app.get("/love/:things", function(req, res) 
{
   var things = req.params.things;
   res.render("love.ejs", {thingVar : things } )
});
app.listen(process.env.PORT, process.env.IP, function()
{
   console.log("The server is listening now .."); 
});
