var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var friendList = ["tony", "samantha", "justin", "lily"];
    
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.post("/addFriend", function(req,res){
    var newFriend = req.body.newFriend;
    friendList.push(newFriend);
    res.redirect("/friends");
});
app.get("/friends", function(req, res){
   res.render("friends", {friends: friendList}); 
});
app.listen(process.env.PORT , process.env.VIP, function()
{
   console.log("server has started.."); 
});