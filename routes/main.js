var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index');
});

router.get('/account', isLoggedIn, function(req, res){
  res.render('account');
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
