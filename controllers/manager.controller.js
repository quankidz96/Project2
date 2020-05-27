var firebase = require('../firebase.js');
var usersRef = firebase.db.ref('users');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports.login = function(req, res) {
    res.render('admin/login/index.ejs');
}

module.exports.admin = function(req, res){
    res.render('admin/main/index.ejs');
}

// module.exports.authenticate = passport.authenticate(
//     'local', { 
//         successRedirect: '/admin',
//         failureRedirect: '/admin/login',
//         failureFlash: true 
//     });

// passport.use(new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password'
//     },
//     function(username, password, done) {
//         usersRef.once('value', function(data){
//             var user = date.val()
//             if(user.username === username && user.password === password ) {
//                 return done(null, username)
//             }
//             else{
//                 return done(null, false)
//             }
//         });
//       User.findOne({email: username}, function(err, username){
//           if(err) throw err;
//           if(username){
//             bcrypt.compare(password, username.password, function(err, user) {
//                 if(err) throw err;
//                 if(user){
//                      return done(null, username);
//                 }else{
//                    return done(null, false, { message: 'Tài Khoảng Không Đúng' });
//                 }
//             });
//           }else{
//              return done(null, false, { message: 'Tài Khoảng Không Đúng' });
//           }
//       });
//     }
// ));

// passport.serializeUser(function(email, done) {
    
//     done(null, email.id);
// });

// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, email) {
//     done(err, email);
//     });
// });

module.exports.isAuthenticated = function(req, res, next){
    
}