// var gets = function (user) {
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?'

//     fetch(apiUrl)
//         .then(function (response) {



function geoLocation() {
    const status = document.querySelector("#status");
    const map = document.querySelector("#map");

    map.href = "";
    map.textContent = "";

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = "";
        map.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        localStorage.setItem('Latitude', latitude);
        localStorage.setItem('Longitude', longitude);
    }

    function error() {
        status.textContent = "Unable to retrieve your location";
    }

    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        status.textContent = "Checking location…";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

document.querySelector("#find").addEventListener("click", geoLocation);
