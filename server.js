var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var AdminsController = require('./controllers/AdminsController');
var UsersController = require('./controllers/UsersController');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/users', UsersController.create);
app.get('/users', UsersController.read);
app.put('/users/:id', UsersController.update);

app.post('/sessions', SessionsController)

app.post('/admins', AdminsController.create);
app.get('/admins', AdminsController.read);
app.put('/admins/:id', AdminsController.update);
app.delete('/admins/:id', AdminsController.delete);

var port = 6000;
var mongoURI = 'mongodb://localhost:27017/lmichelle';

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongooose.connection.once('open', function() {
	console.log('Connected to mongodb port 27017');
});

app.listen (port, function() {
	console.log('listening on port' + port);
});
