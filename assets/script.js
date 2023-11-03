// #region MENU NAVIGATION VARIABLES
const mainMenuBtn = document.getElementById("return-to-main-menu");
const ingredientsMenuBtn = document.getElementById("ingredients-menu-btn");
const findRecipesBtn = document.getElementById("find-recipes-btn");
const viewSavedRecipesBtn = document.getElementById("view-saved-recipes-btn");
const mainMenuBtn2 = document.getElementById("return-to-main-menu-2");
const yesBtn = document.getElementById("weather-yes");
const noBtn = document.getElementById("weather-no");

const mainMenu = document.getElementById('main-menu');
const ingredientsMenu = document.getElementById('ingredients-menu');
const findRecipesMenu = document.getElementById('new-recipes-menu');
const savedRecipesMenu = document.getElementById('saved-recipes-menu');
let popup = document.getElementById("popup");
let longitude = 0;
let latitude = 0;
<<<<<<< HEAD
let popup = document.getElementById("popup");
=======
>>>>>>> 62b15a1fd130b2b1438282bb334e5a13ad04ac67
// #endregion

//template from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
function geoLocation() {
  let status = document.querySelector("#status");


    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        // console.log(latitude);
        // console.log(longitude);


        status = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        localStorage.setItem('Latitude', latitude);
        localStorage.setItem('Longitude', longitude);
        gets();
    }

<<<<<<< HEAD
    status = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    localStorage.setItem('Latitude', latitude);
    localStorage.setItem('Longitude', longitude);
    gets();

    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        // status.textContent = "Checking location…";
        navigator.geolocation.getCurrentPosition(success, error);
    
    }
}

function error() {
    status.textContent = "Unable to retrieve your location";
}


//uses the lat/long data to call user's local weather
var gets = function (user) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=343936b9fd05267869e0bf8c1d533d1c&units=imperial`;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather();

                    //if the call is successful, displayWeather is called which calls the temperature.
                    function displayWeather() {
                        var temperature = data.main.temp;
                        console.log(temperature);
                        // displayPreferredRecipes();
                    }
                });
            } else {
                alert('Error: ' + response.statusText);
            }

        })
        .catch(function (error) {
            alert('Unable to recommend recipes');
        });

}
=======
    function error() {
        status.textContent = "Unable to retrieve your location";
    }

    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
>>>>>>> 62b15a1fd130b2b1438282bb334e5a13ad04ac67


    var gets = function (user) {
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=343936b9fd05267869e0bf8c1d533d1c&units=imperial`;
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        displayWeather();


                        function displayWeather() {
                            console.log(data);

                            var temperature = data.main.temp;
                            console.log(temperature);
                            // displayPreferredRecipes();
                        }
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }

            })
            .catch(function (error) {
                alert('Unable to recommend recipes');
            });

    }

};

// #region MENU NAVIGATION
function resetConditions() {
  //erase ingredients selection string and buttons
}

function showMainMenu() {
    mainMenu.style.display = 'block';
    ingredientsMenu.style.display = 'none';
    findRecipesMenu.style.display = 'none';
    savedRecipesMenu.style.display = 'none';
    popup.style.display = 'none';
}

function showIngredientsMenu() {
    mainMenu.style.display = 'none';
    ingredientsMenu.style.display = 'block';
    findRecipesMenu.style.display = 'none';
    savedRecipesMenu.style.display = 'none';
    popup.style.display = 'none';
}

function showFindRecipesMenu() {
    mainMenu.style.display = 'none';
    ingredientsMenu.style.display = 'none';
    findRecipesMenu.style.display = 'block';
    savedRecipesMenu.style.display = 'none';
    popup.style.display = 'none';
}

function showSavedRecipesMenu() {
    mainMenu.style.display = 'none';
    ingredientsMenu.style.display = 'none';
    findRecipesMenu.style.display = 'none';
    savedRecipesMenu.style.display = 'block';
    popup.style.display = 'none';
}

function showModal() {
    popup.style.display = 'block';
}

mainMenuBtn.addEventListener('click', () => {
    showMainMenu();
})

ingredientsMenuBtn.addEventListener('click', () => {
    showIngredientsMenu();
})


findRecipesBtn.addEventListener('click', () => {
    showModal();
})

viewSavedRecipesBtn.addEventListener('click', () => {
    showSavedRecipesMenu();

})
mainMenuBtn2.addEventListener('click', () => {
    showMainMenu();

})
yesBtn.addEventListener('click', () => {
    geoLocation();
    showFindRecipesMenu();
    //showFindRecipesMenu.add("hidden") --apply hidden class to area on html

})

noBtn.addEventListener('click', () => {
    showFindRecipesMenu();

    //#endregion
<<<<<<< HEAD
})
mainMenu.style.display = "block";
ingredientsMenu.style.display = "none";
findRecipesMenu.style.display = "none";
savedRecipesMenu.style.display = "none";
modal.style.display = "none";

=======
>>>>>>> 62b15a1fd130b2b1438282bb334e5a13ad04ac67

    mainMenu.style.display = "block";
    ingredientsMenu.style.display = "none";
    findRecipesMenu.style.display = "none";
    savedRecipesMenu.style.display = "none";
    popup.style.display = "none";
})

function showIngredientsMenu() {
  mainMenu.style.display = "none";
  ingredientsMenu.style.display = "block";
  findRecipesMenu.style.display = "none";
  savedRecipesMenu.style.display = "none";
  popup.style.display = "none";
}

function showFindRecipesMenu() {
  mainMenu.style.display = "none";
  ingredientsMenu.style.display = "none";
  findRecipesMenu.style.display = "block";
  savedRecipesMenu.style.display = "none";
  popup.style.display = "none";
}

function showSavedRecipesMenu() {
  mainMenu.style.display = "none";
  ingredientsMenu.style.display = "none";
  findRecipesMenu.style.display = "none";
  savedRecipesMenu.style.display = "block";
  popup.style.display = "none";
}

/*function showModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.visibility = "hidden";
}
*/

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}

mainMenuBtn.addEventListener("click", () => {
  showMainMenu();
});

ingredientsMenuBtn.addEventListener("click", () => {
  showIngredientsMenu();
});

findRecipesBtn.addEventListener("click", () => {
  showModal();
});

viewSavedRecipesBtn.addEventListener("click", () => {
  showSavedRecipesMenu();
});

mainMenuBtn2.addEventListener("click", () => {
  showMainMenu();
});

yesBtn.addEventListener("click", () => {
  //call weather and location API and filter results as such.
  closePopup();
  showFindRecipesMenu();
  geoLocation();
});

noBtn.addEventListener("click", () => {
<<<<<<< HEAD
    closePopup();
    showFindRecipesMenu();
    
=======
  showFindRecipesMenu();
>>>>>>> 62b15a1fd130b2b1438282bb334e5a13ad04ac67
});
//#endregion
