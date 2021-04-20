function generateMap(){
    setup();
}

function focusOnArrivalAirport(){
    alert("Test focus view");
}

function focusOnDepartureAirport(){
    alert("Test focus view");
}

function updateButtonsInfo(){

    let userSettings = new Map([
		['geolocation_option', 'on'],
        ['geolocation_coords', []],
		['obstacles', 'test'],
		['runway', 'test'],
		['aerodromes', 'test'],
		['aerodromeNear', 'on'],
		['nearestAirport', 'test'],
        ['nearestAirport_coords', []],
	]);

    let geolocationOption=readForm();
    if(geolocationOption==1){
        userSettings.set("geolocation_option",'on');
    }
    else{
        userSettings.set("geolocation_option",'off');
    }

    return userSettings;
}

function readForm(){
    var arrivalApOption = document.getElementById("user_settings_form");
    console.log(arrivalApOption.value);  
    if(arrivalApOption.value=="geolocation"){
        return 1
    }
    else{
        return 2;
    }
}

