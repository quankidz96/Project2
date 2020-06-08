function activeBtn(){
   var namecate =  document.getElementById('catename').textContent;
   var cates = document.getElementsByClassName('nav-cate');
   for(cate of cates){
      if(cate.textContent == namecate) {
         cate.classList.add("active");
      }
   }
}
activeBtn();

function activePageBtn(){
   var pageBtns = document.getElementsByClassName('page-link');
   var num = document.getElementById('numpage');
   if(num){
      var numPage = num.textContent;
      for(pageBtn of pageBtns){ 
         if(pageBtn.textContent==numPage){
            pageBtn.classList.add('activepage')
         }
      }
   }
}
activePageBtn();