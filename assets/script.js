

var location = document.querySelector("#find-location-btn");

//template from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
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

var gets = function (user) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=343936b9fd05267869e0bf8c1d533d1c';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayRecipes(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to recommend recipes');
        });
};