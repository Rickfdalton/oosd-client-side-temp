 "use strict"

//position of user
var pos;




//this function is responsible for getting user location and  pinning near by locations.
function showPosition(position){
  pos={lat:position.coords.latitude,lng:position.coords.longitude};
  if(pos){
    
    let loc1 = { lat: 8.76, lng: 80.49};
        let map = new google.maps.Map(document.getElementById("map"), {
          zoom: 10,
          center: loc1,
        });
    for (var i = 0; i < geoJson.length; i++) {
      //geoJson[i]['distance']=geoJson[i]['Latitude'] + userLat;
      geoJson[i]['distance']=getDistance(geoJson[i]['Latitude'],geoJson[i]['Longitude']);
      
    }
    
    //sort the array based on distance
    geoJson.sort((a,b)=>(a.distance -b.distance));

    //display least 3
    displayLocation(geoJson[0],map);
    displayLocation(geoJson[1],map);
    displayLocation(geoJson[2],map);

    //console.log(geoJson);

}
}





// function makeRequest(url, callback) {
//   var request;
//   if (window.XMLHttpRequest) {
//   request = new XMLHttpRequest(); // IE7+, Firefox, Chrome, Opera, Safari
//   } else {
//   request = new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
//   }
//   request.onreadystatechange = function() {
//   if (request.readyState == 4 && request.status == 200) {
//   callback(request);
//   }
//   }
//   request.open("GET", url, true);
//   request.send();
//   }


//initaiate the map
function initMap() {
    
    
    // get the current location
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);

  
     }



}

// for every location setiing up
function displayLocation(location,map) {
      

  const latLng = new google.maps.LatLng(location.Latitude, location.Longitude);
  const marker=new google.maps.Marker({
  position: latLng,
  map,
  title: "Vaccination Center",
});

  const infowindow = new google.maps.InfoWindow({
    content:` <div>
                      <h3>${location['VaccinationCenterName']}</h3>
                      <p>${location['Information']}</p>
              </div>`,
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });


}

//get square of distance between vac-center and user location
function getDistance(x,y){
      
  return (x-pos.lat) **2 +(y-pos.lng)**2;
  
}

