function signIn(){

    var provider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(provider)
            .then(function(data){
              console.log(data);
            })
            .catch(function(error){
              console.log(error);
            });
}