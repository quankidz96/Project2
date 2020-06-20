module.exports.checkError = function (req, res, next){
    var errors = [];
    var regex = /[^aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 -]/g;
    var regexNum = /[^0-9]/g;
    var regexEmail = /[^\w@.]/g;
    var data = req.body

    if (!data.name){
        errors.push('Chưa điền tên');
    }else
    if (data.name.match(regex)){
        errors.push('Tên không hợp lệ');
    }
    
    if (!data.phone){
        errors.push('Chưa điền số điện thoại');
    } else{
        if (data.phone.match(regexNum) || data.phone.length>10){
            errors.push('Số điện thoại không hợp lệ');
        } 
    }
    if (!data.email){
        errors.push('Chưa điền địa chỉ email');
    }else
    if (data.email.match(regexEmail)){
        errors.push('Tên không hợp lệ');
    }
    

    if(!req.session.cart){
        errors.push('Hãy chọn sản phẩm trước khi đặt hàng');
    }
    if (errors.length){
        res.locals.errors= errors;
        next();
    }
    else{
        res.locals.errors = null;
        next();
    }  
}