function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
let todaysDate = document.querySelector("#current-date");
let currentDate = new Date();
todaysDate.innerHTML = formatDate(currentDate);

function changeToCelsius(event) {
  event.preventDefault();
  currentTemp.innerHTML = "19°";
}
function changeToFahrenheit(event) {
  event.preventDefault();
  currentTemp.innerHTML = "66°";
}
let currentTemp = document.querySelector(".celsius");
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);
let farenheit = document.querySelector("#fahrenheit");
farenheit.addEventListener("click", changeToFahrenheit);
///city search
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let h5 = document.querySelector("#current-city");
  let units = "metric";
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  if (cityInput.value) {
    h5.innerHTML = `${cityInput.value}`;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let newTemp = document.querySelector(".celsius");
  newTemp.innerHTML = `${temperature}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("click", search);

///current search
function showWeather(response) {
  let updateCity = document.querySelector("#current-city");
  let temperature = Math.round(response.data.main.temp);
  let updateTemp = document.querySelector(".celsius");
  updateCity.innerHTML = `${response.data.name}`;
  updateTemp.innerHTML = `${temperature}`;
}
function retrievePosition(position) {
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
let currentButton = document.querySelector("#current-loc");
currentButton.addEventListener("click", retrievePosition);
//paris current temp
function showTempPa(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#pa-temp");
  temperatureElement.innerHTML = `${temperature}°C`;
}
let units = "metric";
let city = "paris";
let apiKey = "2c4a14026882da503eb13e803b24b4dd";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTempPa);
