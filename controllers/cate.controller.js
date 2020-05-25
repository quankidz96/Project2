var db = require('../db.js');
var cateRef = db.ref('/cates');
var shortid = require('shortid');



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
            var key = shortid.generate();
            req.body.id = key;
            cateRef.child(key).set(req.body);
            res.redirect('/cates/listcates');
        }
        
}

module.exports.fixCate = function(req, res){
    var id = req.params.id;
    console.log(id);
    cateRef.on('value', function(snapshot){
        var data = snapshot.val()[id];
        res.render('admin/cates/fixcate', {data:data, errors: null} )
    })
    
}

module.exports.saveFix = function (req, res){
    var errors = res.locals.errors
        if(res.locals.errors){
            res.render('admin/cates/addcate', {msg: '', error: errors})
        }else{
            var id = req.params.id;
            req.body.id=id;
            cateRef.child(id).set(req.body);
            res.redirect('/cates/listcates');
        }     
}

module.exports.deleteCate = function(req, res){
    var id = req.params.id;
    cateRef.child(id).remove();
    res.redirect('/cates/listcates');
}