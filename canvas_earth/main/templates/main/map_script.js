function initMap() {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
            center: {lat: 44.540, lng: -78.546},
            zoom: 8
        });
        var infoWindow = new google.maps.InfoWindow({map: map});
        var myLatLng = {lat: 32.071006, lng: 34.761871}; //TODO load json with list of places
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        //TODO move to constants file and get from json
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">'+'Artist'+'</h3>'+
            '<div id="bodyContent">'+
            'This is some info'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        var marker = new google.maps.Marker({ //TODO for loop on the locations
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
}