module.exports.index = function(req, res){
    res.render('admin/carts/listcarts');
}

module.exports.goindex = function(req, res){
    res.redirect('/carts/listcarts')
}

module.exports.viewcart = function(req, res){
    res.render('admin/carts/viewcart');
}