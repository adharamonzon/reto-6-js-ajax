'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const cities = [];
let filteredCities = [];

//traer datos de la api
const getDataFromApi = () => {
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => cities.push(...data));
};
//spread (...) hace que sea un único array

const findMatches = (wordToMatch, cities) => {
  return cities.filter(place => {
    //figured out which city was searched
    const regex = new RegExp(wordToMatch, 'gi') //aqui matchea la palabra escrita 'gi' = g(global, mira el string entero) i(insensitive, le da igual lowercase que uppercase)
    return place.city.match(regex) || place.state.match(regex);
  })
}
//pintar el número de la población con comas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//pintar la solución de la búsqueda
function displayMatches () {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map((place) => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
    <li class='list-item'>
    <p class='name'>${cityName}, ${stateName}</p>
    <p class='population'>${numberWithCommas(place.population)}</p>
    </li>
    `
  }).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

getDataFromApi();