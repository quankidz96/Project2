var db = require('../db.js');
var cateRef = db.ref('/cates');
var shortid = require('shortid');



module.exports.index = function(req, res){
    cateRef.on('value', function(snapshot){
        console.log(snapshot.val());
        res.render('admin/cates/listcates', {
            cates: snapshot.val(),
            errors: null,
            msg: ''
        });
    })
    
}

module.exports.goIndex = function(req, res){
    res.redirect('/cates/listcates')
}

module.exports.create = function(req, res){
    res.render('admin/cates/addcate', {errors: null, msg: ''});
}

module.exports.postCreate = function(req, res){
        var key = shortid.generate();
        req.body.id = key;
        cateRef.child(key).set(req.body);
        res.redirect('/cates/listcates');
}

module.exports.fixCate = function(req, res){
    var id = req.params.id;
    console.log(id);
    cateRef.on('value', function(snapshot){
        var data = snapshot.val()[id]
        res.render('admin/cates/fixcate', {data:data, errors: null} )
    })
    
}

module.exports.saveFix = function (req, res){
    
}