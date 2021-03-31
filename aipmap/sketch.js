let map;

function setup() {
	createCanvas(windowWidth, windowHeight);

	if('geolocation' in navigator) {
		console.log("location available");
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position.coords);
			const lat=position.coords.latitude;
			const lon=position.coords.longitude;
			document.getElementById('latitude').textContent=lat;
			document.getElementById('longitude').textContent=lon;
			const myLatLng = { lat: lat, lng: lon};
			new google.maps.Marker({
			  position: myLatLng,
			  map,
			  title: "Hello World!",
			});
			// var center = new google.maps.LatLng(lat,lon);
            // map.panTo(center);
			map.setCenter({
				lat : lat,
				lng : lon
			});
			map.setZoom(15);
		  });
	} else {
		console.log("location not available");
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
