var firebase = require('../firebase.js');
var prodRef = firebase.db.ref('/products');
var catesRef = firebase.db.ref('/cates');
var allRef = firebase.db.ref('/');
var shortid = require('shortid');


module.exports.search = function(req, res){ 
    catesRef.once('value', function(data){
        var cates = data.val();
        if(res.locals.errors){
            render = {
                
                products:'',
                
                cates:cates,
                
                errors:res.locals.errors
            }
            res.render('site/main/search',render);                    
        }
        else{
            var q = req.query.q;
            var page = parseInt(req.query.page) || 1;
            var perPage = 8;
            var start = (page - 1)*perPage;
            var end = page*perPage;
            prodRef.orderByKey().once('value', function(products){
                var list = Object.values(products.val());
                var newlist = list.filter(function(product){
                    return (product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
                });
                var length =newlist.length;
                
                    if(length){
                        var amountPage = Math.floor(length/perPage)+1;
                        render = {
                            page:page,
                            amountPage:amountPage,
                            cates:cates,
                            query:q,
                            products:newlist.slice(start,end),
                            errors:null
                        }
                        res.render('site/main/search',render);
                    }else{
                        render = {
                            page:page,
                            products:'',
                            amountPage:amountPage,
                            cates:cates,
                            query:q,
                            errors:null
                        }
                        res.render('site/main/search',render);
                    }
            }); 
        }
            
    }); 
}