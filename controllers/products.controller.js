var firebase = require('../firebase.js');
var prodRef = firebase.db.ref('/products');
var catesRef = firebase.db.ref('/cates');
var allRef = firebase.db.ref('/');
var shortid = require('shortid');
var fs = require('fs');

function boDau(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ /g, "-");
    str = str.replace(/\./g, "-");
    return str;
}

//GET
module.exports.listProd = function(req, res){
    var idcate = req.query.cate || null ;
    catesRef.once('value', function(snapshot){
        var cates = snapshot.val();
        if(idcate){
            prodRef.orderByChild('cate').equalTo(idcate).once('value', function(data){
                products = Object.values(data.val());
                res.render('admin/products/listproducts', {
                    products: products,
                    cates:cates,
                    errors: null,
                    msg: req.flash('msg')
                });
            });
        }else{
            prodRef.once('value', function(data){
                products = Object.values(data.val());
                res.render('admin/products/listproducts', {
                    products: products,
                    cates:cates,
                    errors: null,
                    msg: req.flash('msg')
                });
            });
        }
        
       
    });   
    
}


module.exports.createProd = function (req, res){
    catesRef.once('value', function(snapshot){
        var cates = snapshot.val();
        res.render('admin/products/addproduct', {
            product:{},
            cates:cates,
            errors: null,
            msg: ''
        });
    });
}

module.exports.deleteProd = function(req, res){
    var id= req.params.id;
    prodRef.once('value', function(snapshot){
        var path = './public/' + snapshot.val()[id].img;
        if (fs.existsSync(path)){
            fs.unlink(path, function(e){
                if(e){
                    console.log(e);
                }
            });
        }
        prodRef.child(id).remove().then(function(){
            res.redirect('/products/listproducts');
        });
        
    });       
}

module.exports.updateProd = function(req, res){
    var id = req.params.id;
    allRef.once('value', function(data){
        var product = data.val().products[id];
        var cates = data.val().cates;
        res.render('admin/products/fixproduct',{
           product: product,
           cates: cates,
           errors: null,
           msg:'Vui lòng chọn lại ảnh'
        });
    });
}

//POST
module.exports.postCreateProd = function (req, res){
    if(res.locals.errors) {
        if(req.file){
            var path =  req.file.path.split('\\').join('/');
            if (fs.existsSync(path)){
                fs.unlink(path, function(e){
                    if(e){
                        console.log(e);
                    }
                });
            }
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
            namekodau: boDau(data.name),
            cate:data.cate,
            des: data.des,
            price: data.price
        }
           
        save.img = req.file.path.split('\\').slice(1).join('/');
        prodRef.child(id).set(save).then(function(){
            req.flash('msg', 'Thêm sản phẩm thành công');
            res.redirect('/products/listproducts');
        }).catch(function(err){
            console.log('error')
        });
        
    }
}

module.exports.postUpdateProd = function(req, res){
    var id = req.params.id;
    if(res.locals.errors) {
        if(req.file){
            // Xóa file ảnh vừa lưu
            var path = './' + req.file.path.split('\\').join('/');
            if (fs.existsSync(path)){
                fs.unlink(path, function(e){
                    if(e){
                        console.log(e);
                    }
                });
            }
        }
        allRef.once('value', function(snapshot){
            var cates = snapshot.val().cates;
            var product = snapshot.val().products[id];
            res.render('admin/products/fixproduct', {
                product: product,
                cates: cates,
                errors: res.locals.errors,
                msg:req.flash('msg')
            });
        });    
    }
    else{
        var data = req.body;
        var id= req.params.id;
        if(req.file){
            prodRef.once('value', function(snapshot){
                // Xóa file ảnh cũ
                var path = './public/' + snapshot.val()[id].img;
                if (fs.existsSync(path)){
                    fs.unlink(path, function(e){
                        if(e){
                            console.log(e);
                        }
                    });
                }
                // Lưu dữ liệu mới
                var save = {
                    id:id,
                    namekodau: boDau(data.name),
                    name:data.name,
                    cate:data.cate,
                    des: data.des,
                    price: data.price
                }
                save.img=req.file.path.split('\\').slice(1).join('/');
                prodRef.child(id).set(save).then(function(){
                    req.flash('msg', 'Sửa thông tin thành công');
                    res.redirect('/products/listproducts');
                });
                
            });
        }else{
            prodRef.once('value', function(snapshot){
                var save = {
                    id:id,
                    namekodau: boDau(data.name),
                    name:data.name,
                    cate:data.cate,
                    des: data.des,
                    price: data.price,
                    img:snapshot.val()[id].img
                }
                prodRef.child(id).set(save).then(function(){
                    req.flash('msg', 'Sửa thông tin thành công');
                    res.redirect('/products/listproducts');
                });
            });
        }
        
        
        
    }
}