/* 	server.js File
 This File Configures and starts the node.js Server.
 */


// Set up server
var express 	= require('express');
var mongoose 	= require('mongoose');
var port 		= 8080;
var database 	= require('./config/database');
var app 		= express();

/* 	configuration	*/
mongoose.connect(database.url);

app.configure(function(){
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/public/templates');
    app.set('view engine', 'jade');
});

/* Define Routes */
require('./app/routes.js')(app);

/* Configure the port App will listen to.	*/
app.listen(port);

