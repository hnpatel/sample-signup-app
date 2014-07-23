/**
 * server.js
 */


/**
 * Set up server
 * Add dependencies
 */
var flash = require('connect-flash'),
    express 	= require('express'),
    mongoose 	= require('mongoose'),
    port 		= 8080,
    database 	= require('./config/database'),
    passport = require('passport');
//  Initialize App
var app 		= express();

//  DB configuration
mongoose.connect(database.url);

// App configuration
app.configure(function(){
    app.use(express.logger('dev'));
    app.use(express.cookieParser('qwertyuio'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({secret: 'qwertyuio'}));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/public/templates');
    app.set('view engine', 'jade');
});

//  Define Routes
require('./config/routes')(app, passport);
require('./config/passport')(passport);


//  Configure the port App will listen to
app.listen(port);

