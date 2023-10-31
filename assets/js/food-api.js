

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

var myHeaders = new Headers();
myHeaders.append("X-RapidAPI-Key", "da196eedb5msh00e79c58139ed2ap1d41a0jsn4c2725d1a2ec");
myHeaders.append("X-RapidAPI-Host", "edamam-recipe-search.p.rapidapi.com");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=" + query,requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  