function formatDateWeekDay(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}`;
}
function formatDateTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="row">
              <div class="col-3">${formatDay(forecastDay.dt)}</div>
              <div class="col-3">
                <img
                  id="icon1"
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  width="30"
                />
              </div>
              <div class="col-3" id="max">${Math.round(
                forecastDay.temp.max
              )}°</div>
              <div class="col-3" id"min">${Math.round(
                forecastDay.temp.min
              )}°</div>
            </div>
    `;
    }
  });

  forecastHTML = forecastHTML + "</div>";

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "57603d1178c0f1e748b2d7cdf9d11821";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature}`;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let windspeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = `${windspeed}km/h`;
  document.querySelector("#city").innerHTML = response.data.name;
  let weekdayElement = document.querySelector("#weekday");
  weekdayElement.innerHTML = formatDateWeekDay(response.data.dt * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDateTime(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city = null;
    alert("Please enter a city");
  }

  searchCity(searchInput.value);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "57603d1178c0f1e748b2d7cdf9d11821";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Mexico");

let searchForm = document.querySelector("#search-form");
searchForm = addEventListener("submit", search);

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "57603d1178c0f1e748b2d7cdf9d11821";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getretrievePosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentlocation = document.querySelector("#currentlocation");
currentlocation.addEventListener("click", getretrievePosition);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("scream");
ctx.drawImage(img, 10, 10);
