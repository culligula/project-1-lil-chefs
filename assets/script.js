

searchContentEl = document.getElementById('search-box');


// get the ingredient 
const concatenateButtons = document.querySelectorAll('.btn');

// print the selected ingredients to an empty container, then use that string
// as a search query in the call to the api
searchContentEl = document.getElementById('search-box');
let concatenatedValue = '';
const emptySpace = String.fromCharCode(32);

concatenateButtons.forEach(button => {
    button.addEventListener('click', () => {
        concatenatedValue += button.value;
        searchContentEl.textContent = concatenatedValue += emptySpace;
    });
});

// api call, initiated on click
document.getElementById("find-recipes-btn").addEventListener("click", function () {
    const query = concatenatedValue;
    const apiKey = "da196eedb5msh00e79c58139ed2ap1d41a0jsn4c2725d1a2ec";
    const apiUrl = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=${query}`;

    var myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", apiKey);
    myHeaders.append("X-RapidAPI-Host", "edamam-recipe-search.p.rapidapi.com");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('API request failed');
            }
        })
        .then(data => {

            const searchResultsEl = document.getElementById('new-recipes-menu');
            console.log(data);


            data.hits.forEach(hit => {
                const recipe = hit.recipe;
                const recipeName = recipe.label;
                const recipeLink = recipe.url;


                const recipeElement = document.createElement("div");
                recipeElement.innerHTML = `<a href="${recipeLink}" target="_blank">${recipeName}</a>`;


                searchResultsEl.appendChild(recipeElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
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
const modal = document.getElementById('modal');
let longitude = 0;
let latitude = 0;

// #endregion

//template for accessing user lat/long from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
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

    function error() {
        status.textContent = "Unable to retrieve your location";
    }

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
    modal.style.display = 'none';
}

function showIngredientsMenu() {
    mainMenu.style.display = 'none';
    ingredientsMenu.style.display = 'block';
    findRecipesMenu.style.display = 'none';
    savedRecipesMenu.style.display = 'none';
    modal.style.display = 'none';
}

function showFindRecipesMenu() {
    mainMenu.style.display = 'none';
    ingredientsMenu.style.display = 'none';
    findRecipesMenu.style.display = 'block';
    savedRecipesMenu.style.display = 'none';
    modal.style.display = 'none';
}

function showSavedRecipesMenu() {
    mainMenu.style.display = 'none';
    ingredientsMenu.style.display = 'none';
    findRecipesMenu.style.display = 'none';
    savedRecipesMenu.style.display = 'block';
    modal.style.display = 'none';
}

function showModal() {
    modal.style.display = 'block';
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

    mainMenu.style.display = "block";
    ingredientsMenu.style.display = "none";
    findRecipesMenu.style.display = "none";
    savedRecipesMenu.style.display = "none";
    modal.style.display = "none";
})

function showIngredientsMenu() {
    mainMenu.style.display = "none";
    ingredientsMenu.style.display = "block";
    findRecipesMenu.style.display = "none";
    savedRecipesMenu.style.display = "none";
    modal.style.display = "none";
}

function showFindRecipesMenu() {
    mainMenu.style.display = "none";
    ingredientsMenu.style.display = "none";
    findRecipesMenu.style.display = "block";
    savedRecipesMenu.style.display = "none";
    modal.style.display = "none";
}

function showSavedRecipesMenu() {
    mainMenu.style.display = "none";
    ingredientsMenu.style.display = "none";
    findRecipesMenu.style.display = "none";
    savedRecipesMenu.style.display = "block";
    modal.style.display = "none";
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
    showFindRecipesMenu();
});
//#endregion
