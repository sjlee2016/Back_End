var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    var friendList = ["tony", "samantha", "justin", "lily"];
   res.render("friends", {friends: friendList}); 
});
app.listen(process.env.PORT , process.env.VIP, function()
{
   console.log("server has started.."); 
});