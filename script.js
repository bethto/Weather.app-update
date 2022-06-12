setInterval(displayTimeAndDate, 1000);
function displayTimeAndDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();
  let seconds = now.getSeconds();

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

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];

  let weatherAppDate = document.querySelector("#weather-app-date");

  let formattedSeconds;
  let formattedHours;
  let formattedMinutes;
  let timeOfDay;

  if (seconds < 10) {
    formattedSeconds = `0${seconds}`;
  } else {
    formattedSeconds = seconds;
  }

  if (hours < 10) {
    formattedHours = `0${hours}`;
  } else {
    formattedHours = hours;
  }

  if (minutes < 10) {
    formattedMinutes = `0${minutes}`;
  } else {
    formattedMinutes = minutes;
  }

  if (hours >= 12) {
    timeOfDay = `PM`;
  } else {
    timeOfDay = `AM`;
  }
  weatherAppDate.innerHTML = `${day} ${month} ${date} ${year} | ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${timeOfDay}`;
}

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temp + `°F`;
  let cityName = document.querySelector("#city-results");
  cityName.innerHTML = response.data.name;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;

  let apiKey = "9e46b7bb0a5d14b5dde75a47243c5b1b";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;

  let apiKey = "9e46b7bb0a5d14b5dde75a47243c5b1b";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);
