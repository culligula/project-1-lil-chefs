

resultContentEl = document.querySelector('#empty-container');




function getParams(){
    const searchParamsArr = document.location.search.split('&');
    const query = searchParamsArr[0].pop();

    searchApi(query);
}
// print the results to the results page
// function printResults() {

// }

// get the ingredient



  const buttoneOne = document.getElementById("btn-1")
  const buttonTwo = document.getElementById("btn-2")
  const buttonThree = document.getElementById("btn-3")

buttoneOne.addEventListener("click", myFunction) 
  const buttonOneValue = button.value;
  console.log(buttonOneValue)


buttoneTwo.addEventListener("click", myFunction) 
  const buttonTwoValue = button.value;


buttoneThree.addEventListener("click", myFunction) 
  const buttonThreeValue = button.value;


resultContentEl.textContent.

var myHeaders = new Headers();
myHeaders.append("X-RapidAPI-Key", "da196eedb5msh00e79c58139ed2ap1d41a0jsn4c2725d1a2ec");
myHeaders.append("X-RapidAPI-Host", "edamam-recipe-search.p.rapidapi.com");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=" + query , requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  