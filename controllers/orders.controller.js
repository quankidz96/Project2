var firebase = require('../firebase.js');
var ordersRef = firebase.db.ref('/orders');

module.exports.index = function(req, res){
    ordersRef.once('value', function(orders){
        res.render('admin/orders/listorders', {
            orders:orders.val()
        });
    });

    
}

module.exports.goindex = function(req, res){
    res.redirect('/orders/listorders')
}

module.exports.viewOrder = function(req, res){
    var id = req.params.id;

    ordersRef.orderByKey().equalTo(id).once('value', function(orders){
        var data = orders.val()[id];   
        var cart = Object.values(data.cart);
        res.render('admin/orders/vieworders', {
            data:data,
            cart:cart,
            key:id
        });
    });
    
}

module.exports.delOrder = function(req, res){
    var id = req.params.id; 
    ordersRef.child(id).remove();
    res.redirect('/orders')  
}

module.exports.viewed = function(req, res){
    var id = req.params.id;
    ordersRef.child(id).update({
        status:1
    })
    res.redirect('/orders');
}