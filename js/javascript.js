/////////////// USER AUTHENTICATION ////////////////////
function adduser(){
	swal("Account created!", "", "success");
	var email=document.getElementById("create_user_email").value;
	var password =document.getElementById("create_user_pass").value;
	firebase.auth().createUserWithEmailAndPassword(email,
	password).catch(function(error) {
	// Handle Errors here
	var errorCode = error.code;
	var errorMessage = error.message;
	swal("Error! "+ error.message, "", "error");
});
}
 
function signIn(){
	swal("Signed In!", "", "success");
	var email= document.getElementById("user_email").value;
	var password = document.getElementById("user_pass").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	swal("Error Signing In", "", "error");
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
});
}
 
function signOut(){
	firebase.auth().signOut().then(function() {
	swal("Signed Out!", "", "success");
	}).catch(function(error) {
});
}

//////// NAV BAR USER DETECTION //////////// 
firebase.auth().onAuthStateChanged(function(user) {
	if (user) { 
 		document.getElementById("navbar_signin_btn").style.display = "none";
 		document.getElementById("navbar_register_btn").style.display = "none";
 		document.getElementById("navbar_signout_btn").style.display = "block";
 		var user_id = firebase.auth().currentUser.uid;
		firebase.database().ref('users/'+user_id).once('value').then(userSnapshot => {
    	if(userSnapshot.exists()){
        	document.getElementById("admin").style.display = "block";
    	} else {
       		console.log(user_id)
       		document.getElementById("admin").style.display = "none";
   		 }
		
		}).catch(error => {
    		console.error(error);
		});
 	} else {
 		document.getElementById("navbar_signin_btn").style.display = "block";
 		document.getElementById("navbar_register_btn").style.display = "block";
 		document.getElementById("navbar_signout_btn").style.display = "none";
 	}
});

function submitForm(){
	alert("Message sent, thank you!");
}


////////// JQUERY /////////////////

$("#navbar_register_btn").on("click",function(e){
    e.preventDefault();
    $('#createaccmodal').modal('show');
})

 $("#navbar_signin_btn").on("click",function(e){
    e.preventDefault();
    $('#signinmodal').modal('show');
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
