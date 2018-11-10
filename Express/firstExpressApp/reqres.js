var express = require("express");
var app = express();

app.get("/", function(req,res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/animal/:animalType", function(req,res) {
    
    switch (req.params.animalType) {
        case 'cat':
            res.send("meow");
            break;
        case 'dog':
            res.send("woof-woof");
        case 'cow':
            res.send("moo");
        default:
            res.send("unknown animal type! Retry with cat/dog/cow");
    }
    
});


app.get("/repeat/:Arg/:num", function(req,res) {
    
    try
    {
        var num = req.params.num;
        for(var i = 0; i< num; i++)
        {
            res.write(req.params.Arg + " ");
        }
    }
    catch(ex)
    {
        res.send("wrong number input");
    }
    res.end();
});

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("server has started");
})