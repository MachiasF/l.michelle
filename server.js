var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var session = require('express-session');
var config = require('./config.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');

var AdminsController = require('./controllers/AdminsController');
var UsersController = require('./controllers/UsersController');
var ShootsController = require('./controllers/ShootsController');

var app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({secret: 'A8382JJSN99SS93112AKDIR626'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
	clientID: config.accountId,
	clientSecret: config.authToken,
	callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done){
	return done(null, profile);
}));

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});

var requireAuth = function(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	return res.redirect('/login');
};

app.get('auth/facebook', passport.authenticate('facebook'));
app.get('auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/me',
	failureRediect: '/login'
}), function(req, res){
	console.log(req.session);
});

app.get('/', requireAuth, function(req,res){
	return res.sendFile(__dirname + 'public/home.html');
});
app.get('/login', function(req, res) {
	return res.sendFile(__dirname + 'public/login.html')
});
app.get('/me', function(req, res){
	res.send(req.user);
});

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

app.post('/admins', AdminsController.create);
app.get('/admins', AdminsController.read);
app.put('/admins/:id', AdminsController.update);
app.delete('/admins/:id', AdminsController.delete);






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
