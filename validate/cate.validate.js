module.exports.checkError = function (req, res, next){
    var errors = [];
    var regex = /^[A-Za-z]+$/g;
    var name = req.body.name;
    if (!name){
        errors.push('Chưa điền tên');
    }
    if (!name.match(regex)){
        errors.push('Tên chỉ có thể là chữ hoặc chữ in hoa');
    }
    if (errors.length){
        res.render('admin/cates/addcate', {
            errors: errors    
        });
        return;
    }
    else{
        errors = null;
        next();
    }  
}