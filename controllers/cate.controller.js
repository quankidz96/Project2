module.exports.index = function(req, res){
    res.render('admin/cates/listcates');
}

module.exports.goindex = function(req, res){
    res.redirect('/cates/listcates')
}

module.exports.addcate = function(req, res){
    res.render('admin/cates/addcate');
}