// var gets = function (user) {
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?'

//     fetch(apiUrl)
//         .then(function (response) {


if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
    elMap.textContent = 'Checking location...';
} else {
    elMap.textContent = msg;

}

che