// <header>
// <h1 class="row" >
//     Weather Dashboard
// </h1>
// </header>
// <main class="container">
// <div class="row" id="search-bar">
//     <input type="text" class="form-input" name="search" id="search" />
//     <button type="button" class="btn">Search</button>
// </div>
// <div class="row" id="previous-searches"></div>
// <div class="row" id="search-results">
//     <div class"row" id="todays-weather"></div>
//     <div class="row"  id="five-day-forcast">
//         <div class="col forcast"></div>

//     </div>
// </div>

var searchBarEl = document.querySelector("#search-bar");
var formInputEl = document.querySelector(".form-input");
var searchBtnEl = document.querySelector(".btn");
var searchResults = document.querySelector("#search-results");
var todaysWeather = document.querySelector("#todays-weather");
var fiveDayForcast = document.querySelector("#five-day-forcast");
var forcastEl = document.querySelector(".forcast");

var apiKey = "55c422bf5964a5456389760079669854";

var getWeather = function (city) {
  var apiUrl =
    "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  fetch(apiIrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          //insert function call to display results
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};
