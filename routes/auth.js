var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

// show register form
router.get("/register", function(req, res){
  res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username, location1: String, location2: String, location3: String,
  location4: String, location5: String, location6: String});
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/account");
    });
  });
});

// show login form
router.get("/login", function(req, res){
  res.render("login");
})
//handle login logic
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/account",
  failureRedirect: "/login"
}), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
})

router.post('/account', isLoggedIn, function(req, res){
  User.find({ username: req.user.username }, function(err, user){
    if (err) throw err;
    req.user.location1 = req.body.address1;
    req.user.location2 = req.body.address2;
    req.user.location3 = req.body.address3;
    req.user.location4 = req.body.address4;
    req.user.location5 = req.body.address5;
    req.user.location6 = req.body.address6;

    req.user.save(function(err){
      if (err) throw err;
      console.log("User succesfully updated!");
      res.redirect('/account');
    });
  });
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
