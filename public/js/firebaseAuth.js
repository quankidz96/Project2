var loginbtn = document.getElementById('login-btn');
var pic = document.getElementById('gg-pic');
var logoutbtn = document.getElementById('logout-btn');
loginbtn.addEventListener('click', signIn);
logoutbtn.addEventListener('click', signOut);

function ischeckIfLogined(){
  firebase.auth().onAuthStateChanged(function(user){
    console.log(user)
    if(user){
      loginbtn.setAttribute('style', 'display: none; visibility: hidden');
      pic.setAttribute('src', user.photoURL);
      logoutbtn.setAttribute('style', 'display: inline-block; visibility: visible');
    }
    else{
      loginbtn.setAttribute('style', 'display: inline-block; visibility: visible');
      logoutbtn.setAttribute('style', 'display: none; visibility: hidden');
    }
  })
}

window.onload = function(){
  ischeckIfLogined();
}

function signIn(){

    var provider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(provider)
            .then(function(data){
              var urlpic = user.photoURL;                  
              pic.setAttribute('src', urlpic);
              loginbtn.setAttribute('style', 'display: none; visibility: hidden');
              logoutbtn.setAttribute('style', 'display: inline-block; visibility: visible');
            })
            .catch(function(error){
              console.log(error);
            });
}

function signOut(){
  firebase.auth().signOut();
  pic.setAttribute('src', '');
  ischeckIfLogined();
}