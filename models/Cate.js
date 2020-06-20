var firebase = require('../firebase.js');
var cateRef = firebase.db.ref('/cates');
var shortid = require('shortid');
function boDau(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ /g, "-");
    str = str.replace(/\./g, "-");
    return str;
}

function Cate(cate){
    var id = shortid.generate();
    this.id = (cate.id)?cate.id:id;
    
    this.name = cate.name || '';

    this.namekodau = (cate.name)?boDau(cate.name):'';

    this.save = function(){
        var data = {
            id:this.id,
            name:this.name,
            namekodau:this.namekodau
        }
        cateRef.child(this.id).set(data);
    }
    this.del = function (){
        cateRef.child(this.id).remove();
    }
}

module.exports = Cate;

