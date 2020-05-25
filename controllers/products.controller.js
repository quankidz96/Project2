var db = require('../db.js');
var prodRef = db.ref('/products');
var catesRef = db.ref('/cates');
var allRef = db.ref('/');
var shortid = require('shortid');
var fs = require('fs');
//GET
module.exports.index = function(req, res){
    prodRef.once('value', function(snapshot){
        // console.log(snapshot.val());
        products = snapshot.val();
        if(!products){
            products = {
                empty:{
                    name:'Empty',
                    price :'0',
                    img :'image/download.jpg'
                }    
            };
        }   
        res.render('admin/products/listproducts', {
            products: products,
            errors: null,
            msg: ''
        });
    });   
    
}

module.exports.goIndex = function(req, res){
    res.redirect('/products/listproducts')
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

module.exports.delete = function(req, res){
    var id= req.params.id;
    prodRef.once('value', function(snapshot){
        var path = './public/' + snapshot.val()[id].img;
        fs.unlink(path, (err) => {
            if (err) throw err;
        });
        prodRef.child(id).remove();
        res.redirect('/products/listproducts');
    });       
}

module.exports.fix = function(req, res){
    var id = req.params.id;
    allRef.once('value', function(data){
        var product = data.val().products[id];
        var cates = data.val().cates;
        res.render('admin/products/fixproduct',{
           product: product,
           cates: cates,
           errors: null 
        });
    });
}

//POST

module.exports.postCreate = function (req, res){
    if(res.locals.errors) {
        if(req.file){
            var file = './' + req.file.path.split('\\').join('/');
            fs.unlink(file, function(e){
                if(e) throw e;
            });
        }
        catesRef.once('value', function(snapshot){
            var cates = snapshot.val();
            var product = {
                name:req.body.name,
                des: req.body.des,
                price:req.body.price,
                cate:req.body.cate
            }
            res.render('admin/products/addproduct', {
                product: product,
                cates: cates,
                errors: res.locals.errors,
                msg:''
            });
        });    
    }
    else{
        var id = shortid.generate();
        var data = req.body;
        var save = {
            id:id,
            name:data.name,
            cate:data.cate,
            des: data.des,
            price: data.price
        }
        save.img=req.file.path.split('\\').slice(1).join('/');
        prodRef.child(id).set(save);
        res.redirect('/products/listproducts');
    }

}

module.exports.saveFix = function(req, res){
    if(res.locals.errors) {
        if(req.file){
            var file = './' + req.file.path.split('\\').join('/');
            fs.unlink(file, function(e){
                if(e) throw e;
            });
        }
        catesRef.once('value', function(snapshot){
            var cates = snapshot.val();
            var product = {
                name:req.body.name,
                des: req.body.des,
                price:req.body.price,
                cate:req.body.cate,
                img: req.file.path
            }
            res.render('admin/products/fixproduct', {
                product: product,
                cates: cates,
                errors: res.locals.errors,
                msg:''
            });
        });    
    }
    else{
        var id = req.params.id;
        var data = req.body;
        prodRef.once('value', function(products){
            var file = './' + products.val()[id].img
            fs.unlink(file, function(e){
                if(e) throw e;
            });
        });
        var save = {
            id:id,
            name:data.name,
            cate:data.cate,
            des: data.des,
            price: data.price
        }
        save.img=req.file.path.split('\\').slice(1).join('/');
        prodRef.child(id).set(save);
        res.redirect('/products/listproducts');
    }
}