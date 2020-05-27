var firebase = require('../firebase.js');
var cateRef = firebase.db.ref('/cates');
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
            var id = shortid.generate();
            var data = {
                id: id,
                name:req.body.name
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
            var data = {
                id: id,
                name:req.body.name
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