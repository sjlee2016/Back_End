var express = require("express");
var app              = express(),
    passport         = require("passport"),
    mongoose         = require("mongoose"),
    bodyParser       = require("body-parser"),
    LocalStrategy    = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User             = require("./models/user");
mongoose.connect("mongodb://localhost/auth_demo");
app.use(require("express-session")({
    secret:"SeJinLeecodedthisblog",
    resave: false,
    saveUninitialized: false 
}));
app.use(bodyParser.urlencoded({ extended:true}));

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function(req,res){
    res.render("home", {currentUser : req.user});
});

app.get("/secret", isLoggedIn, function(req,res){
    res.render("secret");
});

app.get("/register", function(req,res){
    res.render("register");
})
app.post("/register", function(req,res){
    req.body.username 
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    });
});

app.get("/login", function(req,res){
    res.render("login");
});
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect:"/login"
}),
function(req,res){

});
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next;
    }
    res.redirect("/login");
}
app.listen(3000, process.env.IP, function(){
    console.log("server started");
})
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

