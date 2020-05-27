var firebase = require('../firebase.js');
var usersRef = firebase.db.ref('users');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports.login = function(req, res) {
    res.render('admin/login/index.ejs');
}

module.exports.admin = function(req, res){
    res.render('admin/main/index.ejs');
}

module.exports.logout = function(req, res){
    req.logout();
    res.redirect('/admin/login');
}

module.exports.authenticate = passport.authenticate(
    'local', { 
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true 
    });

passport.use(new LocalStrategy(
    function(username, password, done){ 
        usersRef.once('value', function(data){
            if(username == data.val().username) { 
                bcrypt.compare(password, data.val().password, function(err, result) {
                    if(result){
                        return done(null, username);
                    }else{
                        console.log('password sai ')
                        return done(null, false);
                    }
                });
            } else {
                console.log('Tai khoan ko ton tai')
                return done(null, false); 
            }
        });
    }
));

passport.serializeUser(function(username, done){
    usersRef.once('value', function(data){
        done(null, data.val().id);
    })
});

passport.deserializeUser(function(id, done){
    usersRef.once('value', function(data){
        if (id === data.val().id) { 
            return done(null, data.val().id)
        } else {
            return done(null, false)
        }
    })
    
});

