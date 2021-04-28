let mylat,mylong;
let airports_coordinates;

function plotGeolocationAndAirport(map,usermap,latAp,lonAp){
    if(usermap.get('geolocation_option')=='on'){
        if('geolocation' in navigator) {
            console.log("location available");
            console.log(usermap.get('geolocation_option'));
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords);
                const lat=position.coords.latitude;
                const lon=position.coords.longitude;

                usermap.set('geolocation_coords',[lat,lon])
                console.log("updating userSettings with Geolocation coords:(plotGeolocation)")
                console.log(usermap);

                var lineCoordinates = [
                    {lat: lat, lng: lon},
                    {lat: latAp, lng: lonAp},
                ];
                plotNearAirport(map,usermap,lineCoordinates);
                addMarker(lat,lon);
                var center = new google.maps.LatLng(lat,lon);
                setCenterAndZoom(center,10);
            });
        }else {
            console.log("location not available");
        } 
    }
    else{
        console.log("didnt happen");
        console.log(usermap.geolocation_option);
    }

}

function plotGeolocation(map,usermap){
    let mycoords=[];
    
    if('geolocation' in navigator) {
        console.log("location available");
        console.log(usermap.get('geolocation_option'));
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords);
            const lat=position.coords.latitude;
            const lon=position.coords.longitude;
            mycoords=[lat,lon];

            document.getElementById('latitude').textContent=lat;
            document.getElementById('longitude').textContent=lon;
            document.getElementById('airportLat').textContent="_";
            document.getElementById('airportLon').textContent="_";
            document.getElementById('nearest_code').textContent="_";
            document.getElementById('dist_nearest').textContent="_";
                            
            usermap.set('geolocation_coords',[lat,lon])
            console.log("updating userSettings with Geolocation coords:(plotGeolocation)")
            console.log(usermap);

            addMarker(lat,lon);
            var center = new google.maps.LatLng(lat,lon);
            setCenterAndZoom(center,10);

            console.log("@#@#@#@#@#@#@#@#@#@#stuff going on")
            readAirportsFromCSV();
        });
    }else {
        console.log("location not available");            
    }
      
}

function plotNearAirport(map,usermap,coords){
    if(usermap.get('aerodromeNear')=='on'){
        console.log('calling plotNearAirport');
        addLine(coords);
        setZoom(10);
    }
    
}

function drawRwy(map,latRwy0,lonRwy0)
{
    plotGeolocation(map, latRwy0, lonRwy0);
    addMarker(latRwy0, lonRwy0);
}

//Functions about map stuff TODO:put in separate file

function addMarker(lat,lon){
	console.log('adding Marker');
    var center = new google.maps.LatLng(lat,lon);
    new google.maps.Marker({
      position: center,
      map,
      title: "Hello World!",
    });
}

function addLine(coords){
    console.log('adding Line');
    var linePath = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: '#FF0000'
        })
    linePath.setMap(map);
}

function setCenterAndZoom(center,zoom){
    map.setCenter(center);
    map.setZoom(zoom);
}

function setZoom(zoom){
    map.setZoom(zoom);
}



///////////////////////////////////////////////////////
function getWeatherArrival()
{
    getWeather(userSettings,userSettings.get('arrival_airport_textbox'), "arrival");
}

function getWeatherDeparture()
{
    getWeather(userSettings,userSettings.get('departure_airport_textbox'),"departure");
}


async function getWeather(userSettings,code,status)
{
    console.log("$$$ getApi with status:")
    console.log(status);

    var api_url_noendpoint='https://api.flightplandatabase.com/nav/airport/';
    var api_url_withendpoint=api_url_noendpoint.concat(code);
    console.log(api_url_withendpoint);
    const response = await fetch(api_url_withendpoint);
    const data = await response.json();
    console.log("read from api the following JSON:(getAPI)")
    console.log(data);
    var weather_metar = data.weather.METAR;
    var weather_taf=data.weather.TAF;

    console.log("weather metar:= ",weather_metar);
    console.log("weather taf:= ",weather_taf);
    var div=document.getElementById('weather_text');
    div.innerHTML="Weather from Metar: "+weather_metar+" Weather from taf: "+weather_taf;

}
