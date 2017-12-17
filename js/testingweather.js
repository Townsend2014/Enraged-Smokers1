$(document).ready(function(){

  // var zipCode = "54901";
  var key = "id=524901&APPID=3181725de39981ba63d424ec8b057a17";
  console.log('hello');


  
  $("#submit").on("click", function(){
    
    var zipCode = document.getElementById("address").value

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us" + "&" + key;
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=London,us" + "&" + key;


        $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
         $(".city").html("<h4>" + response.name + " Weather Details</h4>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);
        $("#results").css({ 
          background: "transparent url('http://www.emmitsburg.net/humor/pictures/2008/cwp7.jpg')"
           
      });

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });  
  
});

  $("#submit").on("click", function(){
    var name = document.getElementById("address").value

    //if form.val = 0, {everything below}

    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us" + "&" + key;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&" + key;


        $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
         $(".city").html("<h4>" + response.name + " Weather Details</h4>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);
        $("#results").css({ 
          background: "transparent url('http://www.emmitsburg.net/humor/pictures/2008/cwp7.jpg')"
           
      });

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });  
  
});


});
