var express = require('express');
var router = express.Router();
var controller = require('../controllers/manager.controller');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/login', controller.login);

router.get('/' , controller.admin)

router.post('/login', passport.authenticate('local', { 
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true 
    }));


passport.serializeUser(function(email, done) {
    
    done(null, email.id);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    function(username, password, done) {
        usersRef.once('value', function(data){
            var user = date.val();
            if(user.username === username && user.password === password ) {
                return done(null, username)
            }
            else{
                return done(null, false)
            }});
    }));
        
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, email) {
    done(err, email);
    });
});

module.exports = router;