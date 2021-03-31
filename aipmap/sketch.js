let map;

function setup() {
	createCanvas(windowWidth, windowHeight);
	let userSettings = new Map([
		['geolocation_option', 'on'],
		['obstacles', 'off'],
		['runway', 'off'],
		['aerodromes', 'off'],
		['aerodromeNear', 'on'],
	]);
	console.log(userSettings);
	plotGeolocation(map,userSettings);
 
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
