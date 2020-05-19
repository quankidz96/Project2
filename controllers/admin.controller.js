module.exports.login = function(req, res) {
    res.render('admin/login/index.ejs');
}
module.exports.admin = function(req, res){
    res.render('admin/main/index.ejs');
}
module.exports.isAdmin = function(req, res){

}