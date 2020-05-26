module.exports.login = function(req, res) {
    res.render('admin/login/login.ejs');
}
module.exports.admin = function(req, res){
    res.render('admin/main/index.ejs');
}
module.exports.isAuthenticated = function(req, res, next){
    
}