function initMap() {
        var mapDiv = document.getElementById('map');
        var pos = {lat: 32.0648175, lng: 34.7682433,} // added default position
        var map = new google.maps.Map(mapDiv, {
            center: pos,
            zoom: 8
        });
        var infoWindow = new google.maps.InfoWindow({map: map});
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

/*** ADDING LOCATIONS TO MAP ***/
        var contentString = ''
        $.getJSON("locations.json", function(json) {
              json.locations.forEach(function(element){
                var latLng = {lat: element.lat, lng: element.lng};
                var distanceUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial'+
                '&origins='+pos.lat+","+pos.lng+
                '&destinations='+element.lat+","+element.lng+
                '&key=AIzaSyDrqD2yAHvYTlBYx85GD2zCcuzxYXylkjs'
                console.log(distanceUrl)
//                $.getJSON(distanceUrl, function(json){
//                });
                var contentString = '<div id="content">'+
                    '<div id="content_'+element.id+'">'+
                    '</div>'+
                    '<h3 id="firstHeading'+element.id+'" class="firstHeading">'+element.title+'</h3>'+
                    '<div id="bodyContent'+element.id+'">'+ element.info +'<br>'+
                    '<a href='+element.img_url+'>show</a>'+
                    '</div>'+
                    '</div>';
                var infoWindow = new google.maps.InfoWindow({
                  content: contentString
                });
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: element.title
                });
                marker.addListener('click', function() {
                  infoWindow.open(map, marker);
                });
            })
        });
}