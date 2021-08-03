var searchBarEl = document.querySelector("#search-bar");
var formInputEl = document.querySelector(".form-input");
var searchFormEl = document.querySelector("#search-form");
var citySearchEl = document.querySelector("#city-search");
var searchBtnEl = document.querySelector(".btn");
var searchResults = document.querySelector("#search-results");
var todaysWeather = document.querySelector("#todays-weather");
var fiveDayForcast = document.querySelector("#five-day-forcast");
var forcastEl = document.querySelector(".forcast");
var futureEl = document.querySelector("#future");
var previousCities = document.querySelector("#previous-searches");

var cityNameEl = document.querySelector("#city-name");
var weatherImgEl = document.querySelector("#weather-img");
var cityTempEl = document.querySelector("#temp");
var cityHumidityEl = document.querySelector("#humidity");
var windSpeedEl = document.querySelector("#wind-speed");
var uvIndexEl = document.querySelector("#UV-index");

var apiKey = "55c422bf5964a5456389760079669854";

var previousInput = JSON.parse(localStorage.getItem("City")) || [];

var formSubmitHandler = function (event) {
  event.preventDefault();

  var citySearch = citySearchEl.value.trim();

  if (citySearch) {
    getWeather(event, citySearch);

    citySearchEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getWeather = function (event, city) {
  console.log(event.target);
  if (!city) {
    city = event.target.textContent;
  } else {
    previousInput.push(city);
    localStorage.setItem("City", JSON.stringify(previousInput));
    previousSearchResults();
  }
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

var previousSearchResults = function () {
  previousCities.innerHTML = "";
  for (let j = 0; j < previousInput.length; j++) {
    const previousCityDiv = document.createElement("div");
    previousCityDiv.setAttribute("class", "btn card bg-primary m-1 p-1");
    previousCityDiv.setAttribute("id", "previous-city-searched");
    previousCityDiv.setAttribute("type", "click");
    previousCityDiv.textContent = previousInput[j];
    previousCities.appendChild(previousCityDiv);
  }
};

previousCities.addEventListener("click", getWeather);

var displayWeather = function (cityName) {
  searchResults.classList.remove("d-none");
  futureEl.classList.remove("d-none");

  var uvApiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?&lat=" +
    cityName.coord.lat +
    "&lon=" +
    cityName.coord.lon +
    "&appid=" +
    apiKey +
    "&units=imperial";

  var currentWeather = function () {
    var currentCityName = cityName.name;
    cityNameEl.textContent = currentCityName;

    var weatherIcon = cityName.weather[0].icon;
    weatherImgEl.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
    );

    var currentCityTemp = cityName.main.temp;

    cityTempEl.textContent = "Temperature: " + currentCityTemp + "";

    var currentCityHumidity = cityName.main.humidity;
    cityHumidityEl.textContent = "Humidity: " + currentCityHumidity + "%";

    var currentCityWindSpeed = cityName.wind.speed;
    windSpeedEl.textContent = "Wind Speed: " + currentCityWindSpeed + "MPH";

    fetch(uvApiUrl).then(function (response) {
      response.json().then(function (data) {
        var currentUvIndex = data.current.uvi;
        uvIndexEl.textContent = "UV Index: " + currentUvIndex;
        if (currentUvIndex < 3) {
          uvIndexEl.setAttribute("class", "bg-success text-white");
        } else if (currentUvIndex < 6) {
          uvIndexEl.setAttribute("class", "bg-warning");
        } else {
          uvIndexEl.setAttribute("class", "bg-danger text-white");
        }
      });
    });
  };
  var forcastWeather = function (cityName) {
    fiveDayForcast.innerHTML = "";
    fetch(uvApiUrl).then(function (response) {
      response.json().then(function (data) {
        var forcastArray = data.daily;

        for (var i = 1; i < 6; i++) {
          const element = forcastArray[i];

          var forcastDiv = document.createElement("div");
          forcastDiv.setAttribute(
            "class",
            "col-2 forcast bg-primary text-white m-2 p-2 rounded"
          );

          var forcastIcon = element.weather[0].icon;
          var forcastIconImg = document.createElement("img");
          forcastIconImg.setAttribute(
            "src",
            "http://openweathermap.org/img/wn/" + forcastIcon + "@2x.png"
          );
          forcastDiv.appendChild(forcastIconImg);

          var forcastTemp = element.temp.day;
          var forcastTempDiv = document.createElement("div");
          forcastTempDiv.textContent = "temp: " + forcastTemp;
          forcastDiv.appendChild(forcastTempDiv);

          var forcastWindSpeed = element.wind_speed;
          var forcastWindSpeedDiv = document.createElement("div");
          forcastWindSpeedDiv.textContent = "Wind: " + forcastWindSpeed + "MPH";
          forcastDiv.appendChild(forcastWindSpeedDiv);

          var forcastHumidity = element.humidity;
          var forcastHumidityDiv = document.createElement("div");
          forcastHumidityDiv.textContent = "Humidity: " + forcastHumidity + "%";
          forcastDiv.appendChild(forcastHumidityDiv);

          fiveDayForcast.appendChild(forcastDiv);
        }
      });
    });
  };
  currentWeather(cityName);
  forcastWeather(cityName);
};
previousSearchResults();
searchFormEl.addEventListener("submit", formSubmitHandler);
