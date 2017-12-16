      function initMap() {
        var map = new google.maps.Map(document.getElementById('mapimage'), {
          zoom: 8,
          center: {lat: 33.35, lng: -111.79}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
          jeffAwesome();
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }


   function jeffAwesome(){
    var zipCode = document.getElementById("address").value
    console.log(name);

    var key = "id=524901&APPID=3181725de39981ba63d424ec8b057a17";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&" + key;


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
        $(".city").html("<h3>" + response.name + " Weather Details</h3>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });  


  
};
