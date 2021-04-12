let map;
const api_url = 'https://api.flightplandatabase.com/nav/airport/lrop';

function setup() {
	createCanvas(windowWidth, windowHeight);
	let userSettings = new Map([
		['geolocation_option', 'on'],
		['obstacles', 'off'],
		['runway', 'off'],
		['aerodromes', 'off'],
		['aerodromeNear', 'on'],
		['chosenAirportButton', 'LROP'],
	]);
	console.log(userSettings);
	getAPI(map,userSettings);
}

function draw() {
	//background(225,0,225);
	
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
	center: { lat: 44.5, lng: 26 },
	zoom: 8,
  });
  console.log('Map is working');
}

async function getAPI(map,userSettings){
    const response = await fetch(api_url);
    const data = await response.json();
    console.log("read from api the following JSON:")
    console.log(data);

    const {lat, lon}=data;
	latAp=lat;
	lonAp=lon;
	
	plotGeolocation(map,userSettings,latAp,lonAp);
	addMarker(latAp,lonAp);
}

