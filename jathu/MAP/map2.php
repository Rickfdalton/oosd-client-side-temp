<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <link rel="stylesheet" type="text/css" href="map.css" />
    
  </head>
  <body>
    <div id="map"></div>
    <button id=location>FIND</button>
    <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6BnAZGe2Z2UX0cDAQUyGXR-_FVquDcu4&callback=initMap&v=weekly"
      async
    ></script>
    <script src="../JScript/jquery-3.6.0.min.js"></script>
    <script src="map.js"></script>
  </body>
</html>