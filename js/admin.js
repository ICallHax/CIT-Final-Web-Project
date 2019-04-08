/////////// CHECK IF ADMIN, THEN SHOW ADMIN PANEL OPTIONS /////////////
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user_id = firebase.auth().currentUser.uid;
    firebase.database().ref('users/'+user_id).once('value').then(userSnapshot => {
      if(userSnapshot.exists()){
          document.getElementById("adminpanel").style.display = 'block';
      } else {
          console.log(user_id)
          document.getElementById("adminpanel").style.display = 'none';
       } 
    }).catch(error => {
        console.error(error);
    });
  } else {
  }
});

/////////////// ADD BLOG POSTS TO DB //////////////////
var db = firebase.firestore();
   
function addData(){
  alert("Adding Data");
  var blog_name = document.getElementById("btitle").value;
  var blog_date = document.getElementById("bdate").value;
  var blog_text = document.getElementById("btext").value;

  db.collection("blog").add({
  blogname: blog_name,
  blogdate: blog_date,
  blogtext: blog_text
  })
}