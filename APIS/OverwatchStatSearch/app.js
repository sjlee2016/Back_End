var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
app.set("view engine", "ejs");


app.get("/search", function(req,res){
    res.render("search");
});

app.get("/result", function(req, res){
   request("https://ow-api.com/v1/stats/pc/kr/"+ req.query.name + "-" + req.query.tag + "/complete", function(error, response, body)
   {
      if(!error && response.statusCode == 200)
      {
          var data = JSON.parse(body);
          res.render("result" ,{data: data});
      }
   });
});


app.listen(process.env.PORT, process.env.VIP, function(){
   console.log("server has started"); 
});