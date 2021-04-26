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
]);

function generateMap(){
    setup();
    g_arrivalAiport="";

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
    else{
        g_arrivalAiport="LRAD";
    }
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

    clearInArrivalTextBox();
    clearInDepartureTextBox();

    // -- Geologation FORM
    let geolocationOption=readFormGeolocation();
    if(geolocationOption==1){
        userSettings.set("geolocation_option",'on');
        userSettings.set("departure_airpor_textbox",g_arrivalAiport);
        // writeInArrivalTextBox("test_1");
        // writeInDepartureTextBox("test_1");
    }
    else{
        userSettings.set("geolocation_option",'off');
        // clearInArrivalTextBox();
        clearInDepartureTextBox();
    }
    // -- Geologation FORM

    // -- Arrival Airport FORM
    readFormChosenArrivalAirport();
    if(g_arrivalAiport=="LROP"){
        writeInArrivalTextBox("LROP"); 
    }
    else if(g_arrivalAiport=="LRBC"){
        writeInArrivalTextBox("LRBC");
    }
    else if(g_arrivalAiport=="LRCK"){
        writeInArrivalTextBox("LRCK");
    }
    else{
        writeInArrivalTextBox("LRAD");
    }
    userSettings.set("departure_airport_textbox",g_arrivalAiport);

    queryFeatures();

    return userSettings;
}


function focusOnArrivalAirport(){
    adocument.getElementById()
}

function focusOnDepartureAirport(){
    alert("Test focus view");
}

