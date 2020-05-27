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

    if (errors.length){
        res.locals.errors= errors;
        next();
    }
    else{
        res.locals.errors = null;
        next();
    }  
}