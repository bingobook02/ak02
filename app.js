var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    User                  = require("./models/user"),
    Location              = require("./models/location");
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    path                  = require('path');

var mainRoutes = require("./routes/main"),
    authRoutes = require("./routes/auth");

mongoose.connect("mongodb://localhost:27017/userdb");
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: "Give us an A m8",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use(mainRoutes);
app.use(authRoutes);

app.listen(3000, function(){
  console.log("Server has started!");
});
