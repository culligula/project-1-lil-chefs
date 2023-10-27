const mainMenuBtn = document.getElementById('return-to-main-menu');
const ingredientsMenuBtn = document.getElementById('ingredients-menu-btn');
const newRecipesBtn = document.getElementById('find-recipes-btn');
const viewSavedRecipesBtn = document.getElementById('view-saved-recipes-btn');
const mainMenuBtn2 = document.getElementById('return-to-main-menu-2');

const mainMenu = document.getElementById('main-menu');
const ingredientsMenu = document.getElementById('ingredients-menu');
const newRecipesMenu = document.getElementById('new-recipes-menu');
const savedRecipesMenu =document.getElementById('saved-recipes-menu');

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

// #region MENU NAVIGATION
function showMainMenu() {
  mainMenu.style.display = 'block';
  ingredientsMenu.style.display = 'none';
  newRecipesMenu.style.display = 'none';
  savedRecipesMenu.style.display = 'none';
}

function showIngredientsMenu() {
  mainMenu.style.display = 'none';
  ingredientsMenu.style.display = 'block';
  newRecipesMenu.style.display = 'none';
  savedRecipesMenu.style.display = 'none';
}

function showNewRecipesMenu() {
  mainMenu.style.display = 'none';
  ingredientsMenu.style.display = 'none';
  newRecipesMenu.style.display = 'block';
  savedRecipesMenu.style.display = 'none';
}

function showSavedRecipesMenu() {
  mainMenu.style.display = 'none';
  ingredientsMenu.style.display = 'none';
  newRecipesMenu.style.display = 'none';
  savedRecipesMenu.style.display = 'block';
}

mainMenuBtn.addEventListener('click', () => {
  showMainMenu();
})

ingredientsMenuBtn.addEventListener('click', () => {
  showIngredientsMenu();
})


newRecipesBtn.addEventListener('click', () => {
  showNewRecipesMenu();
})

viewSavedRecipesBtn.addEventListener('click', () => {
  showSavedRecipesMenu();
})

mainMenuBtn2.addEventListener('click', () => {
  showMainMenu();
})
//#endregion
