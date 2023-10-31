

searchContentEl = document.getElementById('search-box');





// print the results to the results page
// function printResults() {

// }

// get the ingredient
  
const concatenateButtons = document.querySelectorAll('.btn');
searchContentEl = document.getElementById('search-box');
let concatenatedValue = '';
const emptySpace = String.fromCharCode(32);

concatenateButtons.forEach(button => {
  button.addEventListener('click', () => {
    concatenatedValue += button.value;
    searchContentEl.textContent = concatenatedValue += emptySpace;
  });
});

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
      // Process the API response data
      const searchResultsEl = document.getElementById('new-recipes-menu');
      console.log(data);

      // Loop through the recipe hits and display them
      data.hits.forEach(hit => {
        const recipe = hit.recipe;
        const recipeName = recipe.label;
        const recipeLink = recipe.url;

        // Create an HTML element to display each recipe
        const recipeElement = document.createElement("div");
        recipeElement.innerHTML = `<a href="${recipeLink}" target="_blank">${recipeName}</a>`;
        
        // Append the recipe element to the results container
        searchResultsEl.appendChild(recipeElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

