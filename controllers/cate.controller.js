var firebase = require('../firebase.js');
var cateRef = firebase.db.ref('/cates');
var shortid = require('shortid');

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


module.exports.listCates = function(req, res){
    cateRef.once('value', function(snapshot){
        var datacates = snapshot.val();
        if(!datacates){
            datacates = {};
            res.render('admin/cates/listcates', {
                cates: snapshot.val(),
                errors: null,
                msg: req.flash('msg')
            });
        }
        else{
            res.render('admin/cates/listcates', {
                cates: snapshot.val(),
                errors: null,
                msg: req.flash('msg')
            });
        }   
    });   
}


module.exports.createCate = function(req, res){
    res.render('admin/cates/addcate', {errors: null, msg: '',value:''});
}

module.exports.postCreateCate = function(req, res,next){
    var errors = res.locals.errors
        if(res.locals.errors){
            res.render('admin/cates/addcate', {msg: '', error: errors,value:(req.body.name)?req.body.name:''})
        }else{
            id = shortid.generate();
            name = req.body.name;
            var cate = {
                id:id,
                name:name,
                namekodau:boDau(name)
            }
            cateRef.child(id).set(cate).then(function(){
                req.flash('msg', 'Thêm thành công');
                res.redirect('/cates/listcates');
            });
            
        }  
}

module.exports.updateCate = function(req, res, next){
    var id = req.params.id;
    cateRef.on('value', function(snapshot){
        var data = snapshot.val()[id];
        res.render('admin/cates/fixcate', {data:data, errors: null});
    });
}

module.exports.postUpdateCate = function (req, res, next){
    var errors = res.locals.errors
    var id = req.params.id;
    var name = req.body.name;
        if(res.locals.errors){
            cateRef.once('value', function(snapshot){
                var data = snapshot.val()[id];
                res.render('admin/cates/fixcate', {data:data, errors: errors} );
            });
        }else{
            var cate = {
                id:id,
                name:name,
                namekodau:boDau(name)
            }
            cateRef.child(id).set(cate).then(function(){
                req.flash('msg', 'Sửa thành công');
                res.redirect('/cates/listcates');
            });
        }     
}

module.exports.deleteCate = function(req, res, next){
    var id = req.params.id;
    cateRef.child(id).remove().then(function(){
        req.flash('msg', "Xóa Thành Công")
        res.redirect('/cates/listcates');
    });
    
    
}