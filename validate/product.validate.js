
module.exports.checkError = function (req, res, next){
    var errors = [];
    var regex = /[^aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 -]/g;
    var data = req.body

    if (!data.name){
        errors.push('Chưa điền tên');
    }

    if (!data.des){
        data.des = ' ';
    }

    if (data.name.match(regex)){
        errors.push('Tên không hợp lệ');
    }
    
    if(!req.file){
        errors.push('Cần chọn ảnh đại diện cho sản phẩm');
    }

    if(!data.price){
        errors.push('Cần nhập giá cho sản phẩm');
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