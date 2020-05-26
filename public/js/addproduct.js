function showimg(){
    $("#img").change(function(e) {

        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
            
            var file = e.originalEvent.srcElement.files[i];
            
            var img = document.getElementById("showimg");
            var reader = new FileReader();
            reader.onloadend = function() {
                 img.src = reader.result;
            }
            reader.readAsDataURL(file);
            $("#img").after(img);
        }
    });
}
showimg();