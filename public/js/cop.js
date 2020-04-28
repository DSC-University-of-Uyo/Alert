// Empty variables to store information. This will get filled later
let requestDetails = {};
let copDetails = {};
let map,
    marker,
    myLatLng;
let infoWindow;

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 6.465422,
            lng: 3.406448
        },
        zoom: 14
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
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

// First send a GET request using Axios and get the cop's details and save it

function getCopData() {
    axios.get(`/cops/info?userId=${userId}`).then((response) => {
        copDetails = response.data.copDetails;
        console.log(copDetails)
        copDetails.location = {
            address: copDetails.location.address,
            longitude: copDetails.location.coordinates[0],
            latitude: copDetails.location.coordinates[1],
        };

        document.getElementById("copDetails").innerHTML = `Display Name: ${copDetails.displayName} Address: ${copDetails.location.address} `;

        myLatLng = {
            lat: copDetails.location.latitude,
            lng: copDetails.location.longitude
        };

        map.setCenter(myLatLng);

        // L.mapbox.accessToken = "pk.eyJ1Ijoib2NodWkiLCJhIjoiY2s4YTF4aDdpMGNnMDNscW1qYWEwanZqNSJ9.YxG1tPGUiIPFd8NsqSfauA";
        //  Load the map and set it to a cop's lat-lng
        // map = L
        //     .mapbox
        //     .map("map", "mapbox.streets");
        // map.setView([
        //     copDetails.location.latitude, copDetails.location.longitude
        // ], 15);

        //  Display a default marker
        // marker = L
        //     .marker([copDetails.location.latitude, copDetails.location.longitude])
        //     .addTo(map);

        // Use MapBox geo-coding API
        // map.addControl(L.mapbox.geocoderControl("mapbox.places", { autocomplete: true }).on("select", (data) => {  This function runs when a place is selected
        //      data contains the geocoding results
        //     console.log(data);

        //      Set the marker to new location
        //     marker.setLatLng([
        //         data
        //             .feature
        //             .center[1],
        //         data
        //             .feature
        //             .center[0]
        //     ]);
        // }));
    }).catch((error) => {
        console.log(error);
    });
}


// Listen for a 'request-for-help' event
socket.on("request-for-help", (eventData) => {
    requestDetails = eventData; // Save request details
    audio.loop = true;
    audio.play();
    // display civilian info
    document.getElementById("notification").innerHTML = `Civilian ${requestDetails.civilianId}  needs help! They're at ${requestDetails.location.address}`;

    // Show civilian location on the map

    var latLng = {
        lat: requestDetails.location.latitude,
        lng: requestDetails.location.longitude
    };
    marker = new google.maps.Marker({
        position: latLng,
        title: "Hello World!",
        image: {
            url: '/images/civilian.png',
            // This marker is 20 pixels wide by 32 pixels high.
            //size: new google
            //    .maps
            //   .Size(50, 50),
            // The origin for this image is (0, 0).
            // origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            // anchor: new google.maps.Point(0, 32)
        }
    });

    // To add the marker to the map, call setMap();
    // marker.setMap(map);
    // L
    //     .marker([
    //         requestDetails.location.latitude, requestDetails.location.longitude
    //     ], {
    //         icon: L.icon({
    //             iconUrl: "/images/civilian.png",
    //             iconSize: [50, 50]
    //         })
    //     })
    //     .addTo(map);

    // To add the marker to the map, call setMap();
    marker.setMap(map);

});

function helpCivilian() {
    // On clicking the button, emit a 'request-accepted' event/signal and send relevant info back to server
    socket.emit("request-accepted", {
        requestDetails: requestDetails,
        copDetails: copDetails
    });

    audio.pause();
}

function ignoreCivilian() {
    // stop audio
    audio.pause();
}


function updateCopLocation(position) {
    axios.post(`/cops/update?userId=${userId}`, {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }).then((response) => {
        console.log(response)
        if (!response.data.copDetails.approved) {
            window.location.href = '/not-approved.html'
        }
    })

    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + google_map_key).then((res) => {
        console.log(res.data.results[0].formatted_address)
        axios.post(`/cops/update/address?userId=${userId}`, {
            address: res.data.results[0].formatted_address,
        })
    })
}



window.addEventListener('load', (event) => {
    const options = {
        timeout: 60000
    };
    watchID = navigator.geolocation.watchPosition(data => {

        if (userId !== null) {
            // axios.post(`/cops/update?userId=${userId}`, {
            //     lat: data.coords.latitude,
            //     lng: data.coords.longitude
            // }).then((response) => {
            //     console.log('position updated', response)
            // })
            updateCopLocation(data);

            getCopData();
        }
    }, errorHandler, options);
});