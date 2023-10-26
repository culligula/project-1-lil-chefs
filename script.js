var getUserRepos = function (user) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    display(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Application');
        });
};
//test push