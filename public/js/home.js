
function pointThousand(){
var regex = /\B(?=(\d{3})+(?!\d))/g;
    var prices = document.getElementsByClassName("pricenew");
    for(price of prices){   
        var newprice = price.textContent.toString().replace(regex, ".") + '   VND';
        price.innerHTML = newprice;
    };
}
pointThousand();

function deleteEmptyCate (){
    var containers = document.getElementsByClassName('productcontainer');
    var cates = document.getElementsByClassName('cates');
    var i = -1;
    for(container of containers){
        i++;
        if(!container.childElementCount){
            cates[i].setAttribute('style', 'display: none; visibility: hidden');
        }
    }
}
deleteEmptyCate();
