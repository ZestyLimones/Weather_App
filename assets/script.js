var searchBarEl = document.querySelector("#search-bar");
var formInputEl = document.querySelector(".form-input");
var searchFormEl = document.querySelector("#search-form");
var citySearchEl = document.querySelector("#city-search");
var searchBtnEl = document.querySelector(".btn");
var searchResults = document.querySelector("#search-results");
var todaysWeather = document.querySelector("#todays-weather");
var fiveDayForcast = document.querySelector("#five-day-forcast");
var forcastEl = document.querySelector(".forcast");

var cityNameEl = document.querySelector("#city-name");
var weatherImgEl = document.querySelector("#weather-img");
var cityTempEl = document.querySelector("#temp");
var cityHumidityEl = document.querySelector("#humidity");
var windSpeedEl = document.querySelector("#wind-speed");
var uvIndexEl = document.querySelector("#UV-index");

var apiKey = "55c422bf5964a5456389760079669854";

var formSubmitHandler = function (event) {
  event.preventDefault();

  var citySearch = citySearchEl.value.trim();

  if (citySearch) {
    getWeather(citySearch);

    citySearchEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};

var displayWeather = function (cityName) {
  console.log(cityName.coord.lon);
  console.log(cityName.coord.lat);

  var uvApiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?&lat=" +
    cityName.coord.lat +
    "&lon=" +
    cityName.coord.lon +
    "&appid=" +
    apiKey +
    "&units=imperial";

  var currentWeather = function () {
    console.log(cityName);
    var currentCityName = cityName.name;
    console.log(currentCityName);
    cityNameEl.textContent = currentCityName;

    var weatherIcon = cityName.weather[0].icon;
    weatherImgEl.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
    );

    var currentCityTemp = cityName.main.temp;
    console.log(currentCityTemp);
    cityTempEl.textContent = "Temperature: " + currentCityTemp + "";

    var currentCityHumidity = cityName.main.humidity;
    console.log(currentCityHumidity);
    cityHumidityEl.textContent = "Humidity: " + currentCityHumidity + "%";

    var currentCityWindSpeed = cityName.wind.speed;
    console.log(currentCityWindSpeed);
    windSpeedEl.textContent = "Wind Speed: " + currentCityWindSpeed + "MPH";

    fetch(uvApiUrl).then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        var currentUvIndex = data.current.uvi;
        console.log(currentUvIndex);
        uvIndexEl.textContent = currentUvIndex;
        if (currentUvIndex < 3) {
          uvIndexEl.setAttribute("class", "bg-success text-white");
        } else if (currentUvIndex < 6) {
          uvIndexEl.setAttribute("class", "bg-warning");
        } else {
          uvIndexEl.setAttribute("class", "bg-danger text-white");
        }
      });
    });
    // var previousSearches = [];
    // previousSearches.push(cityName.name);
    // console.log(previousSearches);
    localStorage.setItem("City", cityName.name);
  };
  currentWeather(cityName);
};

console.log(forcastEl.length);

searchFormEl.addEventListener("submit", formSubmitHandler);
