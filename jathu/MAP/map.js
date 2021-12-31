Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
}

var map;
var data;

const button = document.getElementById("location");

button.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else {
        console.log("geolocation not supported");
    }
});

function showPosition(position){
    const userLon = position.coords.longitude;
    const userLat = position.coords.latitude;
    $.ajax({
        type: "GET",
        url: "map.php",
        success: function (response) {
            // console.log(response);
            data = response;
            console.log(response);
            // var locations = getLocations(JSON.parse(response), userLon, userLat);
            initMap(getLocations(JSON.parse(response), userLon, userLat));
        }
    });
    // console.log("Longitude: "+ position.coords.longitude);
    // console.log("Latitude: "+ position.coords.latitude);
}

function getLocations(obj, userLon, userLat){
    var locations = [];
    // console.log(obj);
    for(var key of Object.keys(obj)){   
        const name = obj[key][0];
        const lon = obj[key][1];
        const lat = obj[key][2];
        const distance = getDistance(lat, lon, userLat, userLon);
        const detail = [name, lon, lat, distance];

        if(locations.length == 0){
            locations.push(detail);
        }else{
            for(let i=locations.length -1; i >= 0; i--){
                if(locations[i][3] < distance){
                    if(i==locations.length -1){
                        locations.push(detail);
                        break;
                    }else{
                        locations.insert(i+1, detail);
                        break;
                    }
                }else if(i==0){
                    locations.insert(0, detail);
                    break;
                }
            }
        }
    }
    return [locations[0], locations[1], locations[2]];
}

function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

function deg2rad(deg){
    return deg * (Math.PI/180);
}



function initMap() {
  // The map, centered on Central Park
  const center = {lat: 6.9270786, lng: 79.861243};
  const options = {zoom: 8, scaleControl: true, center: center};
  map = new google.maps.Map(document.getElementById('map'), options);
  // Locations of landmarks
//   const loc1 = {lat:locations[2][2], lng:locations[2][1]};
//   var mk1 = new google.maps.Marker({position: loc1, map:map});

  
//   const dakota = {lat: 6, lng: 79.9761399};
//   const frick = {lat: 40.771209, lng: -73.9673991};
  // The markers for The Dakota and The Frick Collection
//   var mk1 = new google.maps.Marker({position: dakota, map: map});
//   var mk2 = new google.maps.Marker({position: frick, map: map});
}

/*
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { 
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
      navigator.geolocation.getCurrentPosition(alert());
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
*/