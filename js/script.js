
    //merged google geocoder + google places api for this function
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: { lat: 33.3528, lng: -111.7890 }
        });
        var geocoder = new google.maps.Geocoder();
        document.getElementById('submit').addEventListener('click', function() {
            geocodeAddress(geocoder, map);
            weatherApp();

        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: { lat: -34.397, lng: 150.644 },
            radius: 500,
            type: ['bar']
        }, callback);



    }

    //custom function that can search google places by lat/lng arguments
    function initPlacesMap(lat, lng) {
        var location = { lat: lat, lng: lng };

        map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 13
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

        //input validation, ensures user only enters a valid zip code
        var regex=/^[0-9]+$/;
        if (!address.match(regex)) {
          // alert("Please Enter A Valid Zip Code");
          document.getElementById("status").innerHTML = "Zip Code is not yet valid.";
        }
        else if (address.length == 0) {
          // alert("Please Enter A Valid Zip Code");
          document.getElementById("status").innerHTML = "Zip Code is not yet valid.";
        }
        else if(address.length < 5) {g
          // alert("Please Enter A Valid Zip Code");
          document.getElementById("status").innerHTML = "Zip Code is not yet valid.";
        }
        else{
        geocoder.geocode({ 'address': address }, function(results, status) {
            document.getElementById("status").innerHTML = "Zip Code is valid";
            console.log(results);
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                });
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                console.log("latitude is: " + lat);
                console.log("longitude is: " + lng);
                initPlacesMap(lat, lng);

            } else {
                document.getElementById("status").innerHTML = ('Geocode was not successful for the following reason: ' + status);
                // alert('Geocode was not successful for the following reason: ' + status);
            }


        });
    }
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
        var photos = place.photos;
        var placeLoc = place.geometry.location;
        console.log(place);
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,



        });


        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>Name:</strong> ' + place.name + '</div>' + '<div><strong>Address: </strong>' + place.vicinity + '</div>' + '<div><strong>Open Now:</strong> ' + place.opening_hours.open_now + '</div>' + '<div><strong>Rating:</strong> ' + place.rating + '</div>' + '<div>' + '<div><img src=' + photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 }) + '></div>');
            infowindow.open(map, this);

        });
    }

  
  function weatherApp(){
    
    var zipCode = document.getElementById("address").value
      

     var key = "id=524901&APPID=236fc9aafa8c010ed14a369289014cfb";
    

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
    
  
};




