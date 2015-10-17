//-----------server basics---------------
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

//----------facebook auth-----------
var session = require('express-session');
var config = require('./config.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = mongoose.model('User', require('./models/User.js'));


//-----------controller injection----------
var AdminsController = require('./controllers/AdminsController');
var UsersController = require('./controllers/UsersController');
var ShootsController = require('./controllers/ShootsController');



var app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(cors());

//------------Auth-------------
app.use(session({secret: 'A8382JJSN99SS93112AKDIR626'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
	clientID: config.accountId,
	clientSecret: config.authToken,
	callbackURL: 'http://localhost:3000/auth/facebook/callback',
	profileFields:['facebookId', 'displayName', 'email']
}, function(token, refreshToken, profile, done){
	// console.log(profile)
	// return done(null, profile);
	User.find({facebookId: profile.id}, function(findErr, foundUser){
    	if (findErr) return done(findErr, foundUser);
    	if (!foundUser) {
    	    var newUser = {
    	    	name: profile.displayName, //or whatever facebook/google/twitter/etc calls it on the profile object
    	    	email: profile.emails[0].value, //or wherever facebook puts in on prifle
    	    	facebookId: profile.id //or wherever on facebook profile
    	    };
    	    User.create(newUser, function(createErr, createdUser){
    	    	if (createErr) return done(createErr, null);
    	    	return done(null, createdUser);
    	    })
    	}
    	return done(findErr, foundUser);
    })

}));


app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/me',
	failureRediect: '/login'
}), function(req, res){
	console.log(req.session);
});

var requireAuth = function(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	return res.redirect('/login');
};

app.get('/', requireAuth, function(req,res){
	return res.sendFile(__dirname + 'public/home.html');
});
app.get('/login', function(req, res) {
	return res.sendFile(__dirname + 'public/login.html')
});

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});

app.get('/me', function(req, res){
	res.send(req.user);
});
//---------Auth end------------




// ------end points-------
app.get('/user', function(req, res) {
	res.send(req.user)
})
app.post('/users', UsersController.create);
app.get('/users', UsersController.read);
app.get('/users/:id', UsersController.show);
app.put('/users/:id', UsersController.update);
app.delete('/users/:id', UsersController.delete);

app.post('/shoots', ShootsController.create);
app.get('/shoots', ShootsController.read);
app.get('/shoots/:id', ShootsController.show);
app.put('/shoots/:id', ShootsController.update);
app.delete('/shoots/:id', ShootsController.delete);


//------admin--------
app.get('/admins', UsersController.read);
app.get('/admins/users/:id', UsersController.show);
app.delete('/admins/shoots/:id', ShootsController.delete);
app.post('/admins/newshoot', ShootsController.create);






// Host port and Database port
var port = 3000;
var mongoURI = 'mongodb://localhost:27017/lmichelle';

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
	console.log('Connected to mongodb port 27017');
});

app.listen (port, function() {
	console.log('listening on port ' + port);
});
