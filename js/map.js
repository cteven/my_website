let map;
let latBHT = 52.545175;
let lngBHT = 13.351628;
let marker;
let bounds;

$(document).ready( () => {
  var bhtCoords = new google.maps.LatLng(latBHT, lngBHT);
  var mapProp = {
    center: bhtCoords,
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById("map"),mapProp);
 
  marker = new google.maps.Marker({
              position: bhtCoords,
              map });

  bounds = new google.maps.LatLngBounds();
  
  bounds.extend(marker.position);
  

})

function getUserLocation() {
  if(navigator.geolocation) {

    var mapbutton = document.getElementById('mapbutton');
    mapbutton.innerHTML = 'getting position...';
    mapbutton.disabled = true;

    navigator.geolocation.getCurrentPosition( position => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        showDistance(userPos);
      },
      errorCallback)
  }
}

function showDistance(position) {

  var pos1 = new google.maps.LatLng(latBHT, lngBHT);
  var pos2 = new google.maps.LatLng(position.lat, position.lng);
  
  var distance = (google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2)/1000).toFixed(2);

  var marker2 = new google.maps.Marker({ position: pos2 });

  bounds.extend(marker2.position);

  map.fitBounds(bounds);

  marker.setMap(null);

  const pathToBht = [
    { lat: latBHT, lng: lngBHT },
    { lat: position.lat, lng: position.lng }
  ];

  const lineEndSymbol = {
    path: google.maps.SymbolPath.CIRCLE
  };

  var p = new google.maps.Polyline( {
    path: pathToBht,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    icons: [
      {
      icon: lineEndSymbol,
      offset: "100%"
      },
      {
        icon: lineEndSymbol,
        offset: "0%"
      } ]
  });

  p.setMap(map);


  var mapbutton = document.getElementById('mapbutton');
  mapbutton.parentElement.removeChild(mapbutton);

  document.getElementById('mapheadline').innerHTML = 'Distance between your Location and BHT Berlin';

  var contentcontainer = document.getElementsByClassName('contentcontainer')[0];

  var distText = document.createTextNode('Distance to BHT: ' + distance + ' km');
  var LatLngText = document.createTextNode('Your Latitude and Longitude: ' + position.lat + ', ' + position.lng);
  var precision = document.createTextNode('Precision: ' + position.accuracy + ' m');

  var p = document.createElement('p');
  p.appendChild(distText);
  contentcontainer.appendChild(p);

  var p = document.createElement('p');
  p.appendChild(LatLngText);
  contentcontainer.appendChild(p);

  var p = document.createElement('p');
  p.appendChild(precision);
  contentcontainer.appendChild(p);

}

function errorCallback(error) {
  var mapbutton = document.getElementById('mapbutton');
  mapbutton.innerHTML = "Show Location and Distance to BHT";

  //removing hover effect
  mapbutton.classList.remove('buttonelement');
  
  //adding tooltip to the disabled button
  var tooltipText = document.createTextNode('disabled');
  var tooltip = document.createElement('span');
  tooltip.appendChild(tooltipText);
  tooltip.classList.add('tooltip');
  mapbutton.appendChild(tooltip);

  var p = document.createElement('p');

  var errorText1 = document.createTextNode('An error occured!');
  var errorText2 = document.createTextNode('Try again by reloading the page.');
  var errorText3 = document.createTextNode('You might need to unblock the permissions for this Website to use your location.');

  var container = document.getElementsByClassName('contentcontainer')[0];

  p.appendChild(errorText1);
  container.appendChild(p)

  var p = document.createElement('p');
  p.appendChild(errorText2);
  container.appendChild(p)

  var p = document.createElement('p');
  p.appendChild(errorText3);
  container.appendChild(p)


  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log('permission denied');
      break;
    case error.POSITION_UNAVAILABLE:
      console.log('position unavailable');
      console.log(error.message);
      break;
    case error.TIMEOUT:
      console.log('timeout');
      break;
  }
}