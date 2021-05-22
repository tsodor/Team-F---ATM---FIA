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
        clearInDepartureTextBox();
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
        addLine_geolocation(coords);
        setZoom(10);
    }
    
}
function drawRwy(map,latRwy0,lonRwy0)
{
    plotGeolocation(map, latRwy0, lonRwy0);
    addMarker(latRwy0, lonRwy0);
}


//--------------------------------------------------------------------MONICA

function addNavaid(latnav,lonnav,freq,name,range){
    console.log('adding NAVAID');
    console.log(freq)
    if(freq!=null && range!=null && name!=null){
        var text_api="NAVAID\nFreq."+freq.toString()+"Hz\n"+"Name: "+name+"\nRange "+range.toString()
    }
    else if(freq==null && range!=null && name!=null){
        var text_api="NAVAID\n"+"Name: "+name+"\nRange "+range.toString()
    }
    else if(name==null && freq!=null && range!=null){
        var text_api="NAVAID\nFreq."+freq.toString()+"Hz\n"+"\nRange "+range.toString()
    }
    else if(range==null && freq!=null && name!=null){
        var text_api="NAVAID\nFreq."+freq.toString()+"Hz\n"+"Name: "+name
    }
    else{
        var text_api="NAVAID"
    }
    var position = new google.maps.LatLng(latnav,lonnav);
    var image = new google.maps.MarkerImage(
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.faa.gov%2Fabout%2Foffice_org%2Fheadquarters_offices%2Fang%2Foffices%2Ftc%2Flibrary%2Fstoryboard%2Fimg%2Fui%2FdetailedButtons%2Fnavaids_icon.png&f=1&nofb=1',
        new google.maps.Size(71, 71),
        new google.maps.Point(0, 0),
        new google.maps.Point(17, 34),
        new google.maps.Size(25, 25));
    new google.maps.Marker({
        position: position,
        map,
        icon: image,
        title: text_api,
    });

}

function addEnds(latends,lonends,name){
    console.log('adding RUNWAY');
    var position2 = new google.maps.LatLng(latends,lonends);
    var image2 = new google.maps.MarkerImage(
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Frunway-icon%2Frunway-icon-4.jpg&f=1&nofb=1',
        new google.maps.Size(71, 71),
        new google.maps.Point(0, 0),
        new google.maps.Point(17, 34),
        new google.maps.Size(25, 25));
    new google.maps.Marker({
        position: position2,
        map,
        icon: image2,
        title: "Runway\n" + name,
    });

}


function addRunwayPath(flightPlanCoordinates){
    console.log('addRunwayPath');
    console.log(flightPlanCoordinates);
    var RunwayPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#0055FF",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    RunwayPath.setMap(map);
}

function addAiport(latends,lonends){
    console.log("Adding AIRPORT")
    console.log(latends)
    console.log(lonends)
    var position2 = new google.maps.LatLng(latends,lonends);
    var image2 = new google.maps.MarkerImage(
        'https://play-lh.googleusercontent.com/-Ccz47oJEvO_mEmTxex6X7UN35q-9eeGG-XLn5bM1VRfGroluvUf03ImuQ2X1KHvjqA',
        new google.maps.Size(71, 71),
        new google.maps.Point(0, 0),
        new google.maps.Point(17, 34),
        new google.maps.Size(25, 25));
        new google.maps.Marker({
            position: position2,
            map,
            icon: image2,
            title: "Airport",
    });

}


//--------------------------------------------------------------------MONICA

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

function addLine_geolocation(coords){
    console.log('adding Line');
    var linePath = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: '#ff9000'
        })
    linePath.setMap(map);
}

function addLine_notgeolocation(coords){
    console.log('adding Line');
    var linePath = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: '#b01164'
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
    div.innerHTML="METAR: "+weather_metar+"\nTAF: "+weather_taf;

}

