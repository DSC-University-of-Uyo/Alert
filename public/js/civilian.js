import { request } from "express";

let requestDetails = {};
let copDetails = {};
var map,
    marker,
    myLatLng,
    copModal;

var infoWindow;

function initMap() {
    map = new google
        .maps
        .Map(document.getElementById('map'), {
            center: {
                lat: 6.465422,
                lng: 3.406448
            },
            zoom: 14
        });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator
            .geolocation
            .getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    Swal.fire({
        title: '<strong>Share your location with alert</u></strong>',
        icon: 'warning',
        html: 'Please enable location service on your device',
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Close'
    })
}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

if (navigator.geolocation) {
    navigator
        .geolocation
        .getCurrentPosition(function(data) {
            requestDetails = {
                civilianId: userId,
                location: {
                    // address: data.feature["place_name"],
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    address: ''
                }
            }

            axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.coords.latitude + ',' + data.coords.longitude + '&key=' + google_map_key).then((res) => {
                console.log(res.data.results[0].formatted_address)
                requestDetails.location.address = res.data.results[0].formatted_address
            })

            marker = new google
                .maps
                .Marker({
                    position: {
                        lat: data.coords.latitude,
                        lng: data.coords.longitude
                    },
                    title: "Hello World!"
                });

            // To add the marker to the map, call setMap();
            marker.setMap(map);
        })

    const options = {
        timeout: 60000
    };
    watchID = navigator
        .geolocation
        .watchPosition(data => {

            marker = new google
                .maps
                .Marker({
                    position: {
                        lat: data.coords.latitude,
                        lng: data.coords.longitude
                    },
                    title: "Hello World!"
                });

            // To add the marker to the map, call setMap();
            marker.setMap(map);
        }, errorHandler, options);
} else {
    alert('location error')
}

function requestForHelp() { // When button is clicked, emit an event
    if (requestDetails.location == undefined) {
        Swal.fire({
            title: '<strong>Share your location with alert</u></strong>',
            icon: 'warning',
            html: 'Please enable location service on your device',
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Close'
        })
    } else {
        copModal = Swal.fire({
            title: 'Please wait while we connect you to security personnel near you',
            html: '<img src="/images/Spinner.gif" />',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonAriaLabel: 'Cancel request',
            allowOutsideClick: false
        })

        socket.emit("request-for-help", requestDetails);
    }
}

// Listen for a 'request-accepted' event
socket.on("request-accepted", (eventData) => {
    copDetails = eventData; // Save cop details
    copModal.close() // close the modal

    Swal.fire(`${copDetails.displayName} is near you and is heading your way`)

    // Display Cop address
    document
        .getElementById("notification")
        .innerHTML = `${copDetails.displayName} is near ${copDetails.location.address} and will be arriving at your location shortly.
                You can reach them at their mobile ${copDetails.phone}`;

    // Show cop location on the map
    var copLatLng = {
        lat: copDetails.location.latitude,
        lng: copDetails.location.longitude
    };
    marker = new google
        .maps
        .Marker({
            position: copLatLng,
            title: "Hello World!",
            image: {
                url: '/images/cop.png',
                // This marker is 20 pixels wide by 32 pixels high.
                //size: new google
                //    .maps
                //    .Size(60, 28),
                // The origin for this image is (0, 0).
                // origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                // anchor: new google.maps.Point(0, 32)
            }
        });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
});

// Use MapBox geo-coding API
// map.addControl(L.mapbox.geocoderControl("mapbox.places", {
//     autocomplete: true,
// }).on("select", (data) => {  This function runs when a place is selected
//     console.log(data);  data contains the geocding results

//      Extract address and coordinates from the results and save it
//     requestDetails.location = {
//         address: data.feature["place_name"],
//         latitude: data.feature.center[1],
//         longitude: data.feature.center[0]
//     };

//     marker.setLatLng([data.feature.center[1], data.feature.center[0]]);  Set the marker to new location
// }));

socket.on('no-cops', (eventData) => {
    copModal.close()
    Swal.fire('Unfortunately we where unable to find security personnel near you. Please try again')
})

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        requestDetails.civilianId = user.uid;
        requestDetails.civilianName = user.displayName;
    }
});