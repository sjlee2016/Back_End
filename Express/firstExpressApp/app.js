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
app.get("/r/:subredditName", function(req, res){
 	var subreddit = req.params.subredditName;
	res.send("Welcome to " + subreddit.toUpperCase() + " subreddit! ");
});

app.get("/r/:subredditName/comments/:ID/:title", function(req,res){
	res.send("Welcome to comments page");
});

app.get("*", function(req,res){
	res.send("Wrong URL!");
});

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Server has started");
});

