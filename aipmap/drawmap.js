function plotGeolocation(map,usermap){
    if(usermap.get('geolocation_option')=='on'){
        if('geolocation' in navigator) {
            console.log("location available");
            console.log(usermap.get('geolocation_option'));
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords);
                const lat=position.coords.latitude;
                const lon=position.coords.longitude;
                plotNearAirport(map,usermap,lat,lon)
                document.getElementById('latitude').textContent=lat;
                document.getElementById('longitude').textContent=lon;

                var center = new google.maps.LatLng(lat,lon);
                new google.maps.Marker({
                  position: center,
                  map,
                  title: "Hello World!",
                });
                map.setCenter(center);
                map.setZoom(15);
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

function plotNearAirport(map,usermap,x,y){
    if(usermap.get('aerodromeNear')=='on'){
        console.log('calling plotNearAirport');
        latMe=x;
        lonMe=y;
        document.getElementById('airportLat').textContent=44.55;
        document.getElementById('airportLon').textContent=26.06;
        var lineCoordinates = [
            {lat: latMe, lng: lonMe},
            {lat: 44.55, lng: 26.06},
          ];
        var linePath = new google.maps.Polyline({
        path: lineCoordinates,
        geodesic: true,
        strokeColor: '#FF0000'
        })
        linePath.setMap(map);
    }
    
}

