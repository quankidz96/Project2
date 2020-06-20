
var img = document.getElementById('img');
var show = document.getElementById('showimg');
var old = document.getElementById('oldimg');
img.addEventListener('change', showImg);
function showImg(e){
  if(old){
    old.setAttribute('style', 'display: none; visibility: hidden');
  }
    
    show.src = URL.createObjectURL((e.target.files[0])?e.target.files[0] : e.target.files);
    show.onload = function() {
        URL.revokeObjectURL(show.src);
      }
}
