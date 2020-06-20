var firebase = require('../firebase.js');
var adminRef = firebase.db.ref('admin');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports.login = function(req, res) {
    res.render('admin/login/index.ejs',{
        errors : req.flash('err')
    });
}

module.exports.admin = function(req, res){
    res.render('admin/main/index.ejs',{
        msg: req.flash('msg')
    });
}

module.exports.logout = function(req, res){
    req.logout();
    res.redirect('/admin/login');
}

module.exports.authenticate = passport.authenticate(
    'login', { 
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true 
    });

passport.use('login', new LocalStrategy(
    {passReqToCallback : true},
    function(req, username, password, done){ 
        adminRef.once('value', function(data){
            if(username == data.val().username) { 
                bcrypt.compare(password, data.val().password, function(err, result) {
                    if(result){
                        return done(null, username, req.flash('msg', 'Đăng Nhập Thành Công'));
                    }else{
                        return done(null, false, req.flash('err', 'Tên đăng nhập hoặc mật khẩu không đúng'));
                    }
                });
            } else {
                return done(null, false, req.flash('err', 'Tên đăng nhập hoặc mật khẩu không đúng')); 
            }
        });
    }
));

passport.serializeUser(function(username, done){
    adminRef.once('value', function(data){
        done(null, data.val().id);
    })
});

passport.deserializeUser(function(id, done){
    adminRef.once('value', function(data){
        if (id === data.val().id) { 
            return done(null, data.val().id)
        } else {
            return done(null, false)
        }
    })
    
});

