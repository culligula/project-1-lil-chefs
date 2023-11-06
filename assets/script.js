// #region MENU NAVIGATION VARIABLES
const mainMenuBtn = document.getElementById("return-to-main-menu");
const ingredientsMenuBtn = document.getElementById("ingredients-menu-btn");
const findRecipesBtn = document.getElementById("find-recipes-btn");
const viewSavedRecipesBtn = document.getElementById("view-saved-recipes-btn");
const mainMenuBtn2 = document.getElementById("return-to-main-menu-2");
const yesBtn = document.getElementById("weather-yes");
const noBtn = document.getElementById("weather-no");

const mainMenu = document.getElementById("main-menu");
const ingredientsMenu = document.getElementById("ingredients-menu");
const findRecipesMenu = document.getElementById("new-recipes-menu");
const savedRecipesMenu = document.getElementById("saved-recipes-menu");
const popup = document.getElementById("popup");
const main = document.getElementById("main");
// #endregion

let weatherMain = '';
let weatherTemp = 0;
let recipesList = [];

let longitude = 0;
let latitude = 0;

// #region FOOD API
// get the ingredient
const searchButtons = document.querySelectorAll(".btn");
const exclusionButtons = document.querySelectorAll(".btn-2");
// print the selected ingredients to an empty container, then use that string
// as a search query in the call to the api

let searchValue = "";
// const emptySpace = String.fromCharCode(32);
let exclusionValue = "";
searchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    searchValue += button.value + '+';
    button.classList.add("selected");
    console.log("selected button", button.value);
  });
});
exclusionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    exclusionValue += button.value;
  });
});
// api call, initiated on click
function recipeListGen() {
  const query = searchValue;
  const exclusions = exclusionValue;
  const perPage = 50;
  const apiKey = 'da196eedb5msh00e79c58139ed2ap1d41a0jsn4c2725d1a2ec';
  const apiUrl = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=${query}&excluded=${exclusions}`;
  var myHeaders = new Headers();
  myHeaders.append("X-RapidAPI-Key", apiKey);
  myHeaders.append("X-RapidAPI-Host", "edamam-recipe-search.p.rapidapi.com");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  console.log("API URL:", apiUrl);
  console.log("Headers:", myHeaders);
  // Return the promise returned by fetch
  return fetch(apiUrl, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      const searchResultsEl = document.getElementById("new-recipes-menu");
      console.log(data);
      data.hits.forEach((hit) => {
        const recipe = hit.recipe;
        const recipeName = recipe.label;
        const recipeLink = recipe.url;
        const recipeElement = document.createElement("div");
        recipeElement.innerHTML = `
          <a href="${recipeLink}" target="_blank">${recipeName}</a>
          <button class="save-button" data-recipe='${JSON.stringify(
            recipe
          )}'>Save</button>
        `;
        // Add a click event listener to the "Save" button
        const saveButton = recipeElement.querySelector(".save-button");
        saveButton.addEventListener("click", () => {
          const savedRecipes = JSON.parse(
            localStorage.getItem("savedRecipes") || "[]"
          );
          savedRecipes.push(recipe);
          localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
          console.log("Recipe saved to local storage.");
        });
        searchResultsEl.appendChild(recipeElement);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// TODO: add save button next to result, and save that result to local storage
const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
if (savedRecipes.length > 0) {
  const container = document.getElementById("saved-recipes-list");
  container.innerHTML = "";
  savedRecipes.forEach((recipe) => {
    const recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
      <a href="${recipe.url}" target="_blank">${recipe.label}</a>
    `;
    container.appendChild(recipeEl);
  });
} else {
  const container = document.getElementById("saved-recipes-list");
  container.innerHTML = "<p>No saved recipes yet.</p>";
}
// #endregion

// #region LOCATION AND WEATHER API
//template for locating user coordinates from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
function geoLocation() {
  let status = document.querySelector("#status");
  //called the lat/long coordinates from the browser; re-declared status to house coordinates
  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    status = `${latitude} , ${longitude}`;
    //set coordinates to local storage
    localStorage.setItem("Latitude", latitude);
    localStorage.setItem("Longitude", longitude);
    gets();
  }
  //created catch criteria in case of errors
  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  //utilized OpenWeather API to return temperature using coordinates
  var gets = function (user) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=343936b9fd05267869e0bf8c1d533d1c&units=imperial`;
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            setWeather();

            function setWeather() {
              weatherTemp = data.main.temp;
              weatherMain = data.weather[0].main;
              setRecipeSelectionFromWeather();
            }
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to recommend recipes");
      });
  };
}
// #endregion

// #region MENU NAVIGATION
function resetConditions() {
  //erase ingredients selection string and buttons
}

function showMainMenu() {
  mainMenu.style.display = "block";
  ingredientsMenu.style.display = "none";
  findRecipesMenu.style.display = "none";
  savedRecipesMenu.style.display = "none";
  popup.style.display = "none";
}

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

function showModal() {
  popup.style.display = "block";
}

function openPopup() {
  popup.classList.add("open-popup");
  main.classList.add("overlay");
}

function closePopup() {
  popup.classList.remove("open-popup");
  main.classList.remove("overlay");
}

mainMenuBtn.addEventListener("click", showMainMenu);

ingredientsMenuBtn.addEventListener("click", showIngredientsMenu);

findRecipesBtn.addEventListener("click", showModal);

viewSavedRecipesBtn.addEventListener("click", showSavedRecipesMenu);

mainMenuBtn2.addEventListener("click", showMainMenu);

yesBtn.addEventListener("click", () => {
  geoLocation();
  showFindRecipesMenu();
});

noBtn.addEventListener("click", () => {
  showFindRecipesMenu()
  recipeListGen()
});
//#endregion

// #region RECIPE SORTING BASED ON WEATHER
function setRecipeSelectionFromWeather() {
  let pointer = '';
  console.log('corn: ', weatherMain, weatherTemp);
  if (weatherMain == 'Rain' || weatherMain == 'Drizzle' || weatherMain == 'Thunderstorm' || weatherMain == 'Snow') {
    pointer = 'soup'
    //dish.type
    recipeListGen();
  } else if (weatherMain == 'Clear' || weatherMain == 'Cloudy') {
      if (weatherTemp >= 70) {
        pointer = 'sandwiches';
        console.log(pointer);
        // dish.type
        recipeListGen();
      } else if (weatherTemp < 70 & weatherTemp >= 40) {
        pointer = 'main-course';
        console.log(pointer);
        // meal.type
        recipeListGen();
      } else if (weatherTemp < 40 & weatherTemp >= 10) {
        pointer = 'soup';
        console.log(pointer);
        //dish.type
        recipeListGen();
      } else {
        pointer = 'pancake';
        console.log(pointer);
        //dish.type
        recipeListGen();
    }
  } else {
    //Emergency serevices
    recipeListGen();
  }
}
// #endregion
