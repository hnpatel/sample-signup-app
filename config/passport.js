var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/User');

module.exports = function (passport){

    //Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
        },
        function(req, email, password, done){
            User.findOne({
                email : email,
                password : password
            }, function(err, user){
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false);
                }
//                if(!user.authenticate(password)){
//                    return done(null, false, {
//                        message: 'Invalid usernam/password'
//                    });
//                }
                return done(null, user);
            });
        }
    ));
}