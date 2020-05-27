
function pointThousand(){
var regex = /\B(?=(\d{3})+(?!\d))/g;
    var prices = document.getElementsByClassName("pricenew");
    for(price of prices){
        console.log(price);
        
        //var intprice = parseInt(price.textContent, 10);
        var newprice = price.textContent.toString().replace(regex, ".") + '   VND';
        price.innerHTML = newprice;
    };
}
pointThousand();