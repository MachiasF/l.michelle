//-----------server basics---------------
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();



//----------facebook auth-----------
var session = require('express-session');
var config = require('./config.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/User.js');

//-----------Amazon S3----------------
var AWS = require('aws-sdk');


//-----------controller injection----------
var AdminsController = require('./controllers/AdminsController');
var UsersController = require('./controllers/UsersController');
var ShootsController = require('./controllers/ShootsController');

//----- Amazon S3 Controller---------------
//var ImageController = require('./controllers/ImageController')


app.use(express.static('./public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());


//---------------Auth with Passport-------------
app.use(session({secret: 'A8382JJSN99SS93112AKDIR626'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
	clientID: config.accountId,
	clientSecret: config.authToken,
	callbackURL: 'http://localhost:3000/auth/facebook/callback',
}, function(token, refreshToken, profile, done){
	User.findOne({'facebookId': profile.id}, function(findErr, foundUser){
    	if (findErr) return done(findErr, false);
    	if (!foundUser) {
    	    var newUser = {
    	    	name: profile.displayName, 
    	    	facebookId: profile.id 
    	    };
    	    User.create(newUser, function(createErr, createdUser){
    	    	console.log(profile.id, createdUser.admin)
    	    	if (createdUser.facebookId === 10153634733716444 || createdUser.facebookId === 100000903576348){
    	    		createdUser.admin = true;
    	    		createdUser.save();
    	    	};
    	    	if (createErr) return done(createErr, false);
    	    	return done(null, createdUser);
    	    })
    	} else {
	    	return done(null, foundUser);
	    }
    })

}));

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});

function logout(req, res, next) {
	req.logout();
	next();
}

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	//successRedirect: '/#/users',
	failureRediect: '/'
	}), function(req, res){
		if (req.user.admin === true) {
			res.redirect('/#/admin');
		} else {
			res.redirect('/#/users');
		}
});
app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

var requireAuth = function(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	return res.redirect('/');
};

app.get('/', requireAuth, function(req,res){
	return res.sendFile(__dirname + 'public/home.html');
});
app.get('/login', function(req, res) {
	return res.sendFile(__dirname + 'public/login.html')
});


app.get('/me', function(req, res){
	res.send(req.user);
});
//---------Auth end------------



// ------end points-------

//-------AWS S3------------
//app.get('/images', ImageCtrl.read);
//app.post('/images', ImageCtrl.create);

//----current user EP------
app.get('/user', function(req, res) {
	res.send(req.user)
})
//-------user admin EP-------
app.post('/api/users', UsersController.create);
app.get('/api/users', UsersController.read);
app.get('/api/users/:id', UsersController.show);
app.put('/api/users/:id', UsersController.update);
app.delete('/api/users/:id', UsersController.delete);

app.post('/api/shoots', ShootsController.create);
app.get('/api/shoots', ShootsController.read);
app.get('/api/shoots/:id', ShootsController.show);
app.put('/api/shoots/:id', ShootsController.update);
app.delete('/api/shoots/:id', ShootsController.delete);


//------admin end points--------
app.get('/api/admins', UsersController.read);
app.get('/api/admins/users/:id', UsersController.show);
app.delete('/api/admins/shoots/:id', ShootsController.delete);
app.post('/api/admins/newshoot', ShootsController.create);






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
