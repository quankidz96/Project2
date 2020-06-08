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


module.exports.index = function(req, res){
    cateRef.once('value', function(snapshot){
        // console.log(snapshot.val());
        var datacates = snapshot.val();
        if(!datacates){
            datacates = {};
        }
        else{
            res.render('admin/cates/listcates', {
                cates: snapshot.val(),
                errors: null,
                msg: ''
            });
        }   
    });   
}

module.exports.goIndex = function(req, res){
    res.redirect('/cates/listcates')
}

module.exports.create = function(req, res){
    res.render('admin/cates/addcate', {errors: null, msg: ''});
}

module.exports.postCreate = function(req, res){
    var errors = res.locals.errors
        if(res.locals.errors){
            res.render('admin/cates/addcate', {msg: '', error: errors})
        }else{
            var id = shortid.generate();
            var name = req.body.name;
            var data = {
                id: id,
                name: name,
                namekodau: boDau(name)  
            }
            cateRef.child(id).set(data);
            res.redirect('/cates/listcates');
        }  
}

module.exports.fixCate = function(req, res){
    var id = req.params.id;
    cateRef.on('value', function(snapshot){
        var data = snapshot.val()[id];
        res.render('admin/cates/fixcate', {data:data, errors: null} )
    })
    
}

module.exports.saveFix = function (req, res){
    var errors = res.locals.errors
    var id = req.params.id;
        if(res.locals.errors){
            cateRef.on('value', function(snapshot){
                var data = snapshot.val()[id];
                res.render('admin/cates/fixcate', {data:data, errors: errors} );
            });
        }else{
            var id = req.params.id;
            var name = req.body.name;
            var data = {
                id: id,
                name:name,
                namekodau: boDau(name)
            }
            cateRef.child(id).set(data);
            res.redirect('/cates/listcates');
        }     
}

module.exports.deleteCate = function(req, res){
    var id = req.params.id;
    cateRef.child(id).remove();
    res.redirect('/cates/listcates');
}