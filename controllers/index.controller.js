var firebase = require('../firebase.js');
var prodRef = firebase.db.ref('/products');
var catesRef = firebase.db.ref('/cates');
var allRef = firebase.db.ref('/');
module.exports.home = function(req, res){
    allRef.once('value', function(data){
        var products = data.val().products;
        var cates = data.val().cates;
        res.render('site/main/home', {
            cates: cates,
            products: products
        });
    });  
}