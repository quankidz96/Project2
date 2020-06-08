var firebase = require('../firebase.js');
var prodRef = firebase.db.ref('/products');
var catesRef = firebase.db.ref('/cates');
var allRef = firebase.db.ref('/');
var ordersRef = firebase.db.ref('/orders');
var shortid = require('shortid');


module.exports.home = function(req, res){
    allRef.on('value', function(data){
        var products = data.val().products;
        var cates = data.val().cates;
        res.render('site/main/home', {
            cates: cates,
            products: products
        });
    });  
}

module.exports.showCate = function(req, res){
    var idcate = req.params.id;   
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;
    var start = (page - 1)*perPage;
    var end = page*perPage;
    
    catesRef.once('value', function(data){
        var cates = data.val();
        catesRef.orderByKey().equalTo(idcate).on('child_added', function(cate){
            var catename = cate.val().name;
            prodRef.orderByChild('cate').equalTo(idcate).on('value', function(products){
                if(!products.val()){
                    res.render('site/main/showcate',{
                        page:page,
                        products:'' ,
                        amountPage:0,
                        cates:cates,
                        catename: catename 
                    })
                }else{
                var listProduct = Object.values(products.val());
                var length = listProduct.length;
                var amountPage = (length%perPage===0)? Math.floor(length/perPage) : Math.floor(length/perPage)+1;
                res.render('site/main/showcate', {
                    page:page,
                    amountPage:amountPage,
                    cates:cates,
                    catename: catename,
                    products:listProduct.slice(start,end)
                }); 
                }
            });
                
        });
    });    
}

module.exports.detail = function(req, res){
    var id      = req.params.id;
    var idcate  = req.params.idcate

    catesRef.once('value', function(catelist){
        var cates = catelist.val();
            prodRef.orderByChild('cate').equalTo(idcate).on('value', function(products){
                if(!products.val()){
                    res.render('site/main/showcate',{
                        data:'',
                        products:'' ,
                        cates:cates
                    });
                }else{
                var data = products.val()[id];
                var listProduct = Object.values(products.val());
                
                res.render('site/main/detail', {
                    cates:cates,
                    data: data,
                    products:listProduct.slice(0,4)
                }); 
                }
            });
                
        
    });  
}


function Cart(oldCart){
	this.items  = oldCart.items || {};

	this.add    = function(id, item){
		var cart    = this.items[id];

		if(!cart){
			cart    = this.items[id] = {item: item, amount: 0, price: 0}
		}
		cart.amount++;
		cart.price  = cart.amount * cart.item.price;
	}

	this.updateCart = function(id, amount){
		var cart    = this.items[id];
		cart.amount = amount;
		cart.price  = cart.item.price * amount;
	}

	this.delCart = function(id){
		delete this.items[id];
	}
}
module.exports.addToCart = function(req, res){
    var id      = req.params.id;
    var cart    = new Cart((req.session.cart) ? req.session.cart : {items: {}});

    prodRef.orderByKey().equalTo(id).once('value', function(data){ 
        cart.add(id, data.val()[id]);
        req.session.cart = cart;
        res.redirect('/cart');
    });
    
}
module.exports.cart = function(req, res){
    catesRef.once('value', function(cates){
        
        var cart = new Cart((req.session.cart) ? req.session.cart : {items: {}});
        var data = Object.values(cart.items);
        res.render('site/main/cart',{
            msg:req.flash('msg'),
            data:data,
            cates:cates.val()
        })
    });
    
}

module.exports.delCart = function(req, res){
    var id 		= req.body.id;
	var cart    = new Cart( (req.session.cart) ? req.session.cart : {items: {}} );

	cart.delCart(id);
	req.session.cart = cart;
	res.json({st: 1});
}

module.exports.updateCart = function(req, res){
    var id 		= req.body.id;;
	var amount 	= req.body.amount;
	var cart	= new Cart( (req.session.cart) ? req.session.cart : {items: {}} );

	cart.updateCart(id, amount);
	req.session.cart = cart;
	res.json({st: 1});
}

module.exports.orderCart = function(req, res){
    
    var cart = req.session.cart;
    
    if(cart){
        var data = Object.values(cart.items);
        catesRef.once('value', function(cates){
            res.render('site/main/infoform',  {
                cates:cates.val(),
                data:data,
                error:null
            });
        });
    }
}

module.exports.postInfo = function(req, res){
    
    var cart = new Cart(req.session.cart)
    var data = cart.items
    console.log(data);
    
    var order = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        mess: req.body.mess,
        cart:data,
        status:0
    }
    console.log(order)
    var id = shortid.generate();
    ordersRef.push(order).then(function(){
        req.session.cart = null;
        req.flash('msg', 'Đã Gửi Dơn Hàng Thành Công')
        res.redirect('/cart');
    });
    
}