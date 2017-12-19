

      //merged google geocoder + google places api for this function
      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();
        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
          weatherApp();

        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: {lat: -34.397, lng: 150.644},
          radius: 500,
          type: ['cafe']
        }, callback);

        
        
      }

      //custom function that can search google places by lat/lng arguments
      function initPlacesMap(lat,lng) {
        var location = {lat: lat, lng: lng};

        map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 14
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: location,
          radius: 5000,
          type: ['bar']
        }, callback);
      }

      //need this for geocode(boilerplate from Google Documentation)
      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          console.log(results);
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            console.log("latitude is: " + lat);
            console.log("longitude is: " + lng);
            initPlacesMap(lat,lng);

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
          

        });
      }

      //need this for Places functionality
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      //need this for Places functionality(creates markers)
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }


   function weatherApp(){
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


  
};



