$(document).ready(function(){

    $('.updateCart').click(function(){
        var id = $(this).attr('id');
        var amount = parseInt($('#'+id).val());
        if(amount > 0){
            $.post(
                '/updateCart',
                {
                  id      : id,
                  amount : amount
                }, function(data){                     
                  
                  if(data.st == 1) location.href = "/cart";
                }
            ), 'json';
        }
    });
     $('.delCart').click(function(){
        var id = $(this).attr('id');
       
            $.post(
                '/delCart',
                {
                  id      : id
                }, function(data){                     
                  
                  if(data.st ==1) location.href = "/cart";
                }
            ), 'json';
        
    });


});