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

module.exports = Cart;