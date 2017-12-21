// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC6ep04RzS1MZw6oVcThylSSFHXRItKm9U",
    authDomain: "enragedsmokers1.firebaseapp.com",
    databaseURL: "https://enragedsmokers1.firebaseio.com",
    projectId: "enragedsmokers1",
    storageBucket: "enragedsmokers1.appspot.com",
    messagingSenderId: "558217311563"
  };
  firebase.initializeApp(config);
  // Create a variable to reference the database
  var dataRef = firebase.database();
  // Initial values
  var zipcode = "";
  // Capture Button Click
  $("#submit").on("click", function(event){
    event.preventDefault();
    // Coding logic for storing and retrieving the most current zip code
    zipcode = $("#address").val().trim();

    dataRef.ref().push({
    zipcode: zipcode
    });
  });
  // Firebase watcher + initial loader
  // database.ref().on("value", function(snapshot) {
  // This writes it into the h1
  //   $("#display").html(snapshot.val().zipcode);
  // });

  dataRef.ref().on("child_added", function(childSnapshot) {

    // console.log(childSnapshot.val().zipcode);

    // Full list of zipcodes

    $("#full-zipcode-list").append(childSnapshot.val().zipcode + " " + " | " );

    // Handle the errors

  }, function(errorObject) {

    // console.log("Errors handled: " + errorObject.code);
  });