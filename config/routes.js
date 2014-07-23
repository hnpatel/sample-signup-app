var Person = require('./../app/models/Person');

module.exports = function(app, passport){

    var users = require('../app/controllers/users');
    app.get('/login', users.login);
    app.get('/logout', users.logout);

    /**
     * Retrieve Email Records for the People signed-up
     * This resource is secured to make sure only Authenticated user gets access to
     * email list.
     */
	app.get('/verify-records', isLoggedIn,function(req, res){
	    console.log("Retrieve all entries");
        Person.find({},{_id:0, __v:0}, function(err, doc){
            if(!err){
                res.render('records', {
                    records : doc
                })
            }
        });
    });

    /**
     * Insert new record in the DB.
     *
     */
    app.post('/insertRecord', function(req, res){
        console.log("Request to Insert New record in Database");

        res.header("Access-Control-Allow-Methods", "GET, POST");

        var receivedData = JSON.parse(req.body.userInfo);
        var email;
        if(receivedData.email !=undefined){
            email = receivedData.email.toLowerCase();
        }
        Person.find({email : email}, function(err, doc){
            if(!err && doc.length > 0){
                console.log('Requested Record Exists in the Database');
                res.send("Record Exists");
            }else{
                var person = new Person();
                person.firstName    =   receivedData.firstName;
                person.lastName     =   receivedData.lastName;
                person.email        =   email;
                person.save(function(err, doc){
                    if(err != undefined){
                        res.send(err);
                    }
                    else{
                        res.send(doc);
                    }
                });
            }
        });
    });

    /**
     * User Login
     */
    app.post('/user/login', passport.authenticate('local', {
        failureRedirect: 'login',
        failureFlash: 'Invalid Email and/or Password !'
    }), users.records);
};

/**
 * Verify and Route user based on weather he is logged in or not.
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
