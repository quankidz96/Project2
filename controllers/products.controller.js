var db = require('../db.js');
var prodRef = db.ref('/products');
var catesRef = db.ref('/cates');
var shortid = require('shortid');

module.exports.index = function(req, res){
    var products
    var cates 
    prodRef.once('value', function(snapshot){
        // console.log(snapshot.val());
        products = snapshot.val();
        if(!products){
            products = {};
        }   
    });   
    catesRef.once('value', function(snapshot){
        cates = snapshot.val();
        if(!cates){
            cates = {};
        }   
    })
    res.render('admin/products/listproducts', {
        products: products,
        cates:cates,
        errors: null,
        msg: ''
    });
}

module.exports.create = function (req, res){
    
    catesRef.once('value', function(snapshot){
        var cates = snapshot.val();
        res.render('admin/products/addproduct', {
            cates:cates,
            errors: null,
            msg: ''
        });
    });
    
}