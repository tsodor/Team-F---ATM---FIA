let g_arrivalAiport="";
let userSettings = new Map([
    ['geolocation_option', 'off'],
    ['geolocation_coords', []],
    ['nearestAirport', 'off'],
    ['departure_airport_textbox', 'TEST_NAME'],
    ['departure_airport_coords', []],
    ['arrival_airport_textbox', 'TEST_NAME'],
    ['arrival_airport_coords', []],
    ['obstacles', 'off'],
    ['runway', 'off'],
    ['aerodromes', 'off'],
    ['navaids', 'off'],
    ['aerodromeNear', 'on'],       
    ['readFromApi', 'off'],       
]);

function generateMap(){
    setup();
    g_arrivalAiport="";
}

function latestMapUpdate(update){
    userSettings=update;
    console.log("Latest update of userMap in (latestMapUpdate)")
    console.log(userSettings);
}

//Getter/Setter Text Buttons
function writeInArrivalTextBox(text){
    var arrTexttBox = document.getElementById("arname");
    arrTexttBox.value = text;
    console.log("/////////////////////////////////////////Text Box is being written (writeInArrivalTextBox):")
    console.log(text);
}
 function writeInDepartureTextBox(text){
    var depTexttBox = document.getElementById("depname");
    depTexttBox.value = text;
    console.log("/////////////////////////////////////////Text Box is being written writeInDepartureTextBox):")
    console.log(text); 
 }

function clearInArrivalTextBox(){
    var arrTexttBox = document.getElementById("arname");
    arrTexttBox.value = "";
}
 function clearInDepartureTextBox(){
    var depTexttBox = document.getElementById("depname");
    depTexttBox.value = ""; 
 }

function readFormGeolocation(){
    var arrivalApOption = document.getElementById("formGeolocation");
    console.log(arrivalApOption.value);  
    if(arrivalApOption.value=="geolocation"){
        return 1
    }
    else{
        return 2;
    }
}

function readFormChosenArrivalAirport(){
    var arrivalApOption = document.getElementById("formArrival");
    console.log(arrivalApOption.value);  
    if(arrivalApOption.value=="ap_lropp"){
        g_arrivalAiport="test";
    }
    else if(arrivalApOption.value=="ap_lrop"){
        g_arrivalAiport="LROP";
    }
    else if(arrivalApOption.value=="ap_lrbc"){
        g_arrivalAiport="LRBC";
    }
    else if(arrivalApOption.value=="ap_lrck"){
        g_arrivalAiport="LRCK";
    }
    else if(arrivalApOption.value=="ap_lrtc"){
        g_arrivalAiport="LRTC";
    }
    else if(arrivalApOption.value=="ap_lrtr"){
        g_arrivalAiport="LRTR";
    }
    else if(arrivalApOption.value=="ap_lrcl"){
        g_arrivalAiport="LRCL";
    }
    else if(arrivalApOption.value=="ap_lrtm"){
        g_arrivalAiport="LRTM";
    }
    else{
        g_arrivalAiport="Not Found in API";
    }
    console.log("chosen arrival airport is (readFromArrivalAirport())")
    console.log(arrivalApOption.value);   
    userSettings.set("departure_airport_textbox",arrivalApOption.value);
}
function readFromChosenArrivalAirport(){
    var arrivalApOption = document.getElementById("arname");
    console.log("chosen arrival airport is (readFromArrivalAirport())")
    console.log(arrivalApOption.value);   
    userSettings.set("arrival_airport_textbox",arrivalApOption.value.toLowerCase());
}
function readFromChosenDepartureAirport(){
    var departureApOption = document.getElementById("depname");
    console.log("chosen departure airport is (readFromDepartureAirport())")
    console.log(departureApOption.value);   
    userSettings.set("departure_airport_textbox",departureApOption.value.toLowerCase());
}

function selects(){  
    var ele=document.getElementsByName('chk');  
    for(var i=0; i<ele.length; i++){  
        if(ele[i].type=='checkbox')  
            ele[i].checked=true;  
    }  
}  
function deSelect(){  
    var ele=document.getElementsByName('chk');  
    for(var i=0; i<ele.length; i++){  
        if(ele[i].type=='checkbox')  
            ele[i].checked=false;  
          
    }  
}  
function queryFeatures(){
    console.log("///////////////////////////////////////// (queryFeatures)")
    var ele=document.getElementsByName('chk');  
    for(var i=0; i<ele.length; i++){  
        if(ele[i].type=='checkbox'){
            if(ele[i].checked==true){
                console.log(ele[i].value);
                if(ele[i].value=="runway"){
                    userSettings.set("runway","on");
                }
                else if(ele[i].value=="navaids"){
                    userSettings.set("navaids","on");
                }
                else if(ele[i].value=="obstacles"){
                    userSettings.set("obstacles","on");
                }
                else if(ele[i].value=="readApi"){
                    userSettings.set("readFromApi","on");
                }
                else{
                    userSettings.set("aerodromes","on");
                }

            }
            else{
                console.log("Nothing selected");
            }
        } 
    } 
}   

 //Getter/Setter Text Buttons

function updateButtonsInfo(){

    // clearInArrivalTextBox();
    // clearInDepartureTextBox();

    // -- Geologation FORM
    let geolocationOption=readFormGeolocation();
    if(geolocationOption==1){
        userSettings.set("geolocation_option",'on');
        userSettings.set("departure_airport_textbox",g_arrivalAiport);
        // writeInDepartureTextBox("lrbc")
        // writeInArrivalTextBox("test_1");
        // writeInDepartureTextBox("test_1");
    }
    else{
        userSettings.set("geolocation_option",'off');
        // writeInDepartureTextBox("lrbc")
        // clearInArrivalTextBox();
        // clearInDepartureTextBox();
    }
    // -- Geologation FORM

    // -- Arrival Airport FORM
    readFormChosenArrivalAirport();
    writeInArrivalTextBox(g_arrivalAiport); 
    userSettings.set("arrival_airport_textbox",g_arrivalAiport);
    readFromChosenArrivalAirport();
    readFromChosenDepartureAirport();
    queryFeatures();

    return userSettings;
}


function focusOnArrivalAirport(){
    var coords=userSettings.get('departure_airport_coords');
    var lat=coords[0];
    var lon=coords[1];
    var center = new google.maps.LatLng(lat,lon);
    setCenterAndZoom(center,10);
}

function focusOnDepartureAirport(){
    var coords=userSettings.get('arrival_airport_coords');
    var lat=coords[0];
    var lon=coords[1];
    var center = new google.maps.LatLng(lat,lon);
    setCenterAndZoom(center,10);
}

