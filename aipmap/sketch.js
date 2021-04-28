let map;
const api_url = 'https://api.flightplandatabase.com/nav/airport/lrop';
const api_url_noendpoint='https://api.flightplandatabase.com/nav/airport/';

let b_alreadyread=0;

function setup() {
	initMap();
	createCanvas(windowWidth, windowHeight);

	let userSettings=updateButtonsInfo();
	console.log("1)userSettings after updatedButtonsInfo (setup):")
	console.log(userSettings);

	plotGeolocation(map,userSettings);

	if(userSettings.get('readFromApi')=='on'){
		console.log("Allowed to read from API (setup)");
		getAPI(map,userSettings,userSettings.get('departure_airport_textbox'),"departure");
		getAPI(map,userSettings,userSettings.get('arrival_airport_textbox'), "arrival");
	}
	else{
		console.log("Not allowed to read from API (setup)");
	}
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

async function getAPI(map,userSettings,code,status) {
	console.log("$$$ getApi with status:")
	console.log(status);

	var api_url_noendpoint='https://api.flightplandatabase.com/nav/airport/';
	var api_url_withendpoint=api_url_noendpoint.concat(code);
	console.log(api_url_withendpoint);
	const response = await fetch(api_url_withendpoint);
	const data = await response.json();
	console.log("read from api the following JSON:(getAPI)")
	console.log(data);

	const {lat, lon} = data;
	latAp = lat;
	lonAp = lon;
	if(status=="departure"){
		userSettings.set('departure_airport_coords',[lat,lon]);
	}
	else{
		userSettings.set('arrival_airport_coords',[lat,lon]);
	}
	console.log("~~~~Most updated userSettings (getAPI):");
	console.log(userSettings);

	userSettings.set('nearestAirport_coords',[latAp,lonAp])
	console.log("updating userSettings with chosen Ap coords:(getAPI)")
	console.log(userSettings);
	latestMapUpdate(userSettings);	
	plotGeolocationAndAirport(map, userSettings, latAp, lonAp);

	if(userSettings.get('aerodromes')=='on'){
		addMarker(latAp, lonAp);
	}

	const datarunway = data.runways;
	if(userSettings.get('navaids')=='on'){
		for (var i = 0; i < datarunway.length; i++) {
			for(var j=0; j<datarunway[i].navaids.length; j++){
				var obj=datarunway[i].navaids[j];
				var latnav=obj.lat;
				var lonnav=obj.lon;
	

				addNavaid(latnav, lonnav);
			}
		}
	}
	if(userSettings.get('runway')=='on'){
		for (var k = 0; k< datarunway.length; k++) {
			for(var p=0; p<datarunway[k].ends.length; p++){
				var obj2=datarunway[k].ends[p];
				var latends=obj2.lat;
				var lonends=obj2.lon;
				var obj3=datarunway[k].ends[p+1];
				console.log(obj3);
				var latends2=obj3.lat;
				var lonends2=obj3.lon;

	
				addEnds(latends, lonends);

				var flightPlanCoordinates = [
					{ lat: latends, lng: lonends },
					{ lat: latends2, lng: lonends2 }
				];
				addRunwayPath(flightPlanCoordinates);
			}
		}
	}


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
		const rows=text.split('\n').slice(0);
		const codes=rows[0].split(',');
		const coords_a=rows[1].split(',');
		updateAirportsCoordinates(codes);
		console.log(rows);
		console.log(codes);
		console.log(coords_a);
		let j=0;
		for (i = 0; i <codes.length; i++) {
			airports_coordinates.set(codes[i],{"lat":coords_a[j],"lon":coords_a[j+1]});
			j=j+2;
		}
		console.log("updated airport_coordinates (readAirportFromCSV)")	
		console.log(airports_coordinates)	
		console.log("updated userSettings (readAirportFromCSV)")	
		console.log(userSettings)
		
		const my_coords=userSettings.get('geolocation_coords');
		console.log(my_coords)
		const my_coords_point={"lat":my_coords[0], "lon":my_coords[1]};
		console.log(my_coords_point)

		console.log("@@@@@@@@@@@@@@@")
		let min_dist=99999999999999;
		let min_dist_code="test";
		let min_lat,min_lon;
		for (let [key, value] of airports_coordinates) {
			console.log(key + " = " + value.lat + "/" + value.lon);
			let current=getDistance(my_coords_point,value);
			if(current<min_dist){
				min_dist=Math.ceil(current);;
				min_dist_code=key;
				min_lat=value.lat;
				min_lon=value.lon;
			}
		}
		console.log("min dist")
		console.log(min_dist)
		console.log(min_dist_code)
		
		document.getElementById('airportLat').textContent=min_lat;
		document.getElementById('airportLon').textContent=min_lon;
		document.getElementById('nearest_code').textContent=min_dist_code.toUpperCase();
		document.getElementById('dist_nearest').textContent=min_dist/1000;
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
	// console.log("updated map (updateAirportCoordinates):")
	// console.log(airports_coordinates);
}

var rad = function(x) {
	return x * Math.PI / 180;
  };
  
var getDistance = function(p1, p2) {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(p2.lat - p1.lat);
	var dLong = rad(p2.lon - p1.lon);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
		Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	console.log(d);
	return d; // returns the distance in meter
};
