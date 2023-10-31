

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


const query = concatenatedValue
const apiUrl = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=${query}`;

var myHeaders = new Headers();
myHeaders.append("X-RapidAPI-Key", "da196eedb5msh00e79c58139ed2ap1d41a0jsn4c2725d1a2ec");
myHeaders.append("X-RapidAPI-Host", "edamam-recipe-search.p.rapidapi.com");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(apiUrl,requestOptions)
.then(response => {
  if (response.ok) {
    return response.json(); // Assuming the API returns JSON data
  } else {
    throw new Error('API request failed');
  }
})
.then(data => {
  // Process the API response data
  const searchResultsEl = document.getElementById('searchResults');
  searchResultsEl.textContent = JSON.stringify(data, null, 2);
})
.catch(error => {
  console.error('Error:', error);
});
