

// get the ingredient 
const searchButtons = document.querySelectorAll('.btn');
const exclusionButtons = document.querySelectorAll('.btn-2');

// print the selected ingredients to an empty container, then use that string
// as a search query in the call to the api
searchContentEl = document.getElementById('search-box');
exclusionContentEl = document.getElementById('exclusion-box');
let searchValue = '';
const emptySpace = String.fromCharCode(32);
let exclusionValue = '';

searchButtons.forEach(button => {
  button.addEventListener('click', () => {
    searchValue += button.value;
    searchContentEl.textContent = searchValue += emptySpace;
  });
});

exclusionButtons.forEach(button => {
  button.addEventListener('click', () => {
    exclusionValue += button.value;
    exclusionContentEl.textContent = exclusionValue += emptySpace;
  });
});


// api call, initiated on click
document.getElementById("find-recipes-btn").addEventListener("click", function () {
  const query = searchValue;
  const exclusions = exclusionValue;
  const apiKey = "da196eedb5msh00e79c58139ed2ap1d41a0jsn4c2725d1a2ec";
  const apiUrl = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=${query}&excluded=${exclusions}`;

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
        recipeElement.innerHTML = `
          <a href="${recipeLink}" target="_blank">${recipeName}</a>
          <button class="save-button" data-recipe='${JSON.stringify(recipe)}'>Save</button>
        `;

        // Add a click event listener to the "Save" button
        const saveButton = recipeElement.querySelector('.save-button');
        saveButton.addEventListener('click', () => {
          const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
          savedRecipes.push(recipe);
          localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
          console.log('Recipe saved to local storage.');
        });
        
        searchResultsEl.appendChild(recipeElement);
        
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


// TODO: add save button next to result, and save that result to local storage

const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');


if (savedRecipes.length > 0) {
  
  const container = document.getElementById('saved-recipes-list'); 
  container.innerHTML = '';

  savedRecipes.forEach(recipe => {
    
    const recipeEl = document.createElement('div');
    recipeEl.innerHTML = `
      <a href="${recipe.url}" target="_blank">${recipe.label}</a>
    `;

    container.appendChild(recipeEl);
  });
} else {
  const container = document.getElementById('saved-recipes-list'); 
  container.innerHTML = '<p>No saved recipes yet.</p>';
}
