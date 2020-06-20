module.exports.checkError = function(req, res, next){
    var errors = [];
    var regex = /[^aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 -]/g;
    var q = req.query.q

    if(!q){
        errors.push('Từ khóa tìm kiếm không hợp lệ');
        errors.push('Hãy nhập từ khóa tìm kiếm');
    }
    if (q.match(regex)){
        errors.push('Từ khóa tìm kiếm không hợp lệ');
    }
    if(q.length>18){
        errors.push('Từ khóa tìm kiếm không thể quá dài')
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