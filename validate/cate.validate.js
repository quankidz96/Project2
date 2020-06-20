var firebase = require('../firebase.js');
var catesRef = firebase.db.ref('/cates');
module.exports.checkError = function (req, res, next){
    var errors = [];
    var regex = /[^aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 -]/g;
    var name = req.body.name
    
    if (!name){
        errors.push('Chưa điền tên');
    }
    
    if (name.match(regex)){
        errors.push('Tên không hợp lệ');
    }
    
    catesRef.once('value',function(data){
        var list = Object.values(data.val());
        
        for(cate of list){   
            if(name.localeCompare(cate.name)===0){
                errors.push('Tên đã tồn tại');
                console.log(name.localeCompare(cate.name));
            } 
        }
        if (errors.length){
            res.locals.errors= errors;
            next();
        }
        else{
            res.locals.errors = null;
            next();
        } 
    });
     
}