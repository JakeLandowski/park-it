$(document).ready(init);

var storage;

function init()
{
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
    console.log(storage);
}

function onDeviceReady()
{
    var node = document.createElement("link");
    node.setAttribute("rel", "stylesheet");
    node.setAttribute("type", "text/css");

    if (cordova.platformid === "ios")
    {
        node.setAttribute('href', 'css/park-it-ios.css');

        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    }
    else
    {
        node.setAttribute('href', 'css/park-it-android.css');
        //window.statusBar.backgroundColorByHexString('#1565C0');
    }

    $('head').append(node);
}

function setParkingLocation()
{
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess, setParkingLocationError, {enableHighAccuracy:true});
}

function setParkingLocationSuccess(position)
{
    latitude = position.coords.latitude;
    storage.setItem("parkedLatitude", latitude);

    //Add statements to store the longitude
    longitude = position.coords.longitude;
    storage.setItem("parkedLongitude", longitude);

    //Display an alert that shows the latitude and longitude
    //Use navigator.notification.alert(msg)

    showParkingLocation();
}

function setParkingLocationError(error)
{
    navigator.notification.alert("Error Code: " + error.code + "\nError Message: " + error.message);
}

function showParkingLocation()
{
    navigator.notification.alert("You are parked at Lat: "
        + storage.getItem("parkedLatitude")
        + ", Long: " + storage.getItem("parkedLongitude"));

    //hide directions and instructions
}

function initMap()
{
    var waCenter = {lat: 47.5962, lng: -120.6614};


    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: waCenter
    });
}

$("#park").click(function() {
    setParkingLocation();

    $("#instructions").slideUp();
});


$("#retrieve").click(function() {
    showParkingLocation();
});

$("#gotIt").click(function() {
    $("#instructions").slideUp();
});