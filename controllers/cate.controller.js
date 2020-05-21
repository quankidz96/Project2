var db = require('../db.js');
var cateRef = db.ref('/cates');
var shortid = require('shortid')
module.exports.index = function(req, res){
    res.render('admin/cates/listcates');
}

module.exports.goIndex = function(req, res){
    res.redirect('/cates/listcates')
}

module.exports.create = function(req, res){
    res.render('admin/cates/addcate');
}

module.exports.postCreate = function(req, res){
        console.log(req.body);
        var key = shortid.generate();
        req.body.id = key;
        cateRef.child(key).set(req.body);
        res.redirect('/cates/addcate');
}
