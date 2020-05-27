var db = require('../db.js');
var prodRef = db.ref('/products');
var catesRef = db.ref('/cates');
var allRef = db.ref('/');
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