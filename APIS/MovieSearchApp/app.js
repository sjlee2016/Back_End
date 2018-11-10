var express = require("express");
var request = require("request");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var APIKey = "e643f1c8"  // limited to 1000 searches per day 

app.get("/search", function(req,res){
   res.render("search"); 
});

app.get("/result", function(req, res){
    
    request('http://www.omdbapi.com/?s='+ req.query.title + '&apikey='+ APIKey, function (error, response, body) {
       
            var data = JSON.parse(body);
            //res.send(parsedData);
            res.render("result", { data : data });
})
});

app.listen(process.env.PORT , process.env.VIP, function()
{
   console.log("server has started.."); 
});