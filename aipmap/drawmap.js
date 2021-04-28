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

//--------------------------------------------------------------------MONICA

function addNavaid(latnav,lonnav){
    console.log('adding Navaid');
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
        title: "Naviad",
    });

}

function addEnds(latends,lonends){
    console.log('adding ends');
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
        title: "Runway",
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

