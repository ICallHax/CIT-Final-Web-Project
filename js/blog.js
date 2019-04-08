/////////// SHOW BLOG CONTAINER IF SIGNED IN //////////////////

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
 		document.getElementById("blogcontainer").style.display = 'block';
 	} else {
 		document.getElementById("blogcontainer").style.display = 'none';
 	}
});

///////////////////////// Blog Functionality ///////////////////////////////
var blogdisplay = document.getElementById('blogs');
blogdisplay.innerHTML = "Loading Data...";
var db = firebase.firestore();
db.collection("blog").get().then((querySnapshot) => {

blogdisplay.innerHTML = "";

querySnapshot.forEach((doc) => {
   blogdisplay.innerHTML += `<div class="card" style="width: 18rem;">
          <div class="card-body">
          <h5 class="card-title">${doc.data().blogname}</h5>
          <p class="card-text">${doc.data().blogtext}</p>
          <p class="card-text"><small class="text-muted">${doc.data().blogdate}</small></p>
          </div>
          </div>`;
});
});