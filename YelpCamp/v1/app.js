var express = require('express');
var app = express();
var campgrounds = [ 
    {name : "Salmon Creek", image:""},
    {name : "Granite Mountain", image:" "},
    {name : "Diamond Hills", image:" "}
]
app.set('view engine', 'ejs');
app.get('/', function(req,res)
{
    res.render('landing');   
});

app.get('/campgrounds', function(req,res)
{

});
app.listen(process.env.PORT , process.env.VIP, function()
{
   console.log("yelp camp server has started");
});