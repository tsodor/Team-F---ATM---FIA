let map;
const api_url = 'https://api.flightplandatabase.com/nav/airport/lrop';
const api_url_noendpoint='https://api.flightplandatabase.com/nav/airport/';
let airports_icao_codes=readAirportsFromCSV();
let airports_coordinates;

function setup() {
	initMap();
	createCanvas(windowWidth, windowHeight);

	let userSettings=updateButtonsInfo();
	console.log("1)userSettings after updatedButtonsInfo (setup):")
	console.log(userSettings);

	readAirportsFromCSV();
	console.log("2)read airport code (setup):")
	console.log(airports_icao_codes);
	console.log("3)read airport coordinates (setup):")
	console.log(airports_coordinates);
	console.log("4)read nearest airport after getNearestAirportICAOCode (setup):")
	let nearestAirport=getNearestAirportICAOCode(airports_coordinates);
	console.log(nearestAirport);

	userSettings.set('nearestAirport',nearestAirport);
	console.log("5)Update userSettings (setup):")
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

async function getAPI(map,userSettings) {
	const response = await fetch(api_url);
	const data = await response.json();
	console.log("read from api the following JSON:(getAPI)")
	console.log(data);

	const {lat, lon} = data;
	latAp = lat;
	lonAp = lon;

	plotGeolocation(map, userSettings, latAp, lonAp);
	addMarker(latAp, lonAp);


	const datarunway = data.runways;
	for (var i = 0; i < datarunway.length; i++) {
		for(var j=0; j<datarunway[i].navaids.length; j++){
			var obj=datarunway[i].navaids[j];
			var latnav=obj.lat;
			var lonnav=obj.lon;

			addMarker(latnav, lonnav);
		}
	}

	for (var k = 0; k< datarunway.length; k++) {
		for(var p=0; p<datarunway[k].ends.length; p++){
			var obj2=datarunway[k].ends[p];
			var latends=obj2.lat;
			var lonends=obj2.lon;

			addMarker(latends, lonends);
		}
	}

}

function calculateDistance(latapi,lonapi){
	// latAp=latapi;
	// lonAp=lonapi;
	// console.log(latAp);
	// addMarker(latAp,lonAp);
	// var obj1= new google.maps.LatLng(22.3, 44.3);
	// var obj2= new google.maps.LatLng(latAp, lonAp);
	// var dist=google.maps.geometry.spherical.computeDistanceBetween(
	// 	obj1,obj2
	// );
	// return dist;
	return 2;
}

async function getAirportsCodes(lon,lat){
	const response=await fetch("airports.csv");
	const data=await response.text();
	const ICAOcodes=data.split(',');
	console.log("Airports taken into consideration:(getAirportsCodes)");
	console.log(ICAOcodes);
	console.log("The user coordinates are:(getAirportsCodes)");
	console.log(lat);
	console.log(lon);
	var dist_min=999999999999999;
	var airport_min="lrop";
	ICAOcodes.forEach(element => {
		var api_url_noendpoint='https://api.flightplandatabase.com/nav/airport/';
		var api_url_withendpoint=api_url_noendpoint.concat(element);
		console.log(api_url_withendpoint);
		var dist=getAPISpecific(api_url_withendpoint,lat,lon);
		console.log(dist)
		if(dist<dist_min){
				airport_min=element;
				console.log(dist);
		}
		
	});
	console.log(airport_min);
	return airport_min;

}

async function readAirportsFromCSV(){
	return fetch("airports.csv")
    .then(response => response.text())
    .then(text => {
	  airports_icao_codes=text.split(',');
	  updateAirportsCoordinates(airports_icao_codes);
    });
}

async function updateAirportsCoordinates(codes){
	console.log("airport coordinates (updateAirportCoordinates):")
	console.log(codes);
	let airport_coords= new Map();
	codes.forEach(element=>{
		airport_coords.set(element,{"lat":"test","lon":"test"});
	})
	airports_coordinates=airport_coords;
	airports_icao_codes.forEach(element=>{
		getAirportLatLonFromAPI(element);
	})
	console.log("updated map (updateAirportCoordinates):")
	console.log(airports_coordinates);
}

async function getAirportLatLonFromAPI(airport_code){
	var api_url_withendpoint=api_url_noendpoint.concat(airport_code);
	console.log(api_url_withendpoint);
	const response = await fetch(api_url_withendpoint);
    const data = await response.json();
    const {lat, lon}=data;
	console.log("read from api the following coordinates (getAiportLatLonFromAPI):")
    console.log({lat:lat,lon:lon});
	airports_coordinates.set(airport_code,{lat:lat,lon:lon});
}

function getNearestAirportICAOCode(){ //FIXED ON LROP BUT TO BE CHANGED FOR NEXT DEMO
	console.log("these are airports coordinates seen here (getNearestAirportICAOCode)")
	console.log(airports_coordinates)
	var min_dist=9999999999;
	
	for (let [key, value] of airports_coordinates) {
		console.log(key + " = " + value.lat);
		var test=calculateDistance(value.lat,value.lon);
		console.log("distance in this iteration is: (getNearestAirportICAOCode)");
		console.log(test);
	}
	return "lrop"
}
