function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[newDate.getDay()];
  let hour = newDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = newDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${day} ${hour}:${minutes}`;
  return formattedDate;
}

let displayTime = document.querySelector("#current-time");
let now = new Date();
displayTime.innerHTML = `${formatDate(now)}`;

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enterCity");
  let foundCity = document.querySelector("#current-city");
  if (cityInput.value) {
    foundCity.innerHTML = `${cityInput.value}`;
    let key = "8438301216c2822a596249b61bb568d7";
    let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}&units=metric`;
    axios.get(cityUrl).then(displayTemp);
  } else {
    alert("Type something...");
  }
}
function displayTemp(response) {
  let tempMain = document.querySelector("#tempMain");
  let temperature = Math.round(response.data.main.temp);
  tempMain.innerHTML = `${temperature} °C`;
}

let cityForm = document.querySelector("#input-form");
cityForm.addEventListener("submit", searchCity);

/*Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.*/

function showTempCels(event) {
  event.preventDefault();
  let tempMain = document.querySelector("#tempMain");
  //let temperature=Math.round(response.data.main.temp);
  tempMain.innerHTML = 23 /*`${temperature} °C`*/;
}

function showTempFahr(event) {
  event.preventDefault();
  let tempMain = document.querySelector("#tempMain");
  tempMain.innerHTML = `${Math.round(23 * 1.8 + 32)}`;
}
function showCurrentCityWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${response.data.name}`;

  let tempMain = document.querySelector("#tempMain");
  let temperature = Math.round(response.data.main.temp);
  tempMain.innerHTML = `${temperature} °C`;
}

function getPosition(position) {
  let key = "8438301216c2822a596249b61bb568d7";
  let currentLatitute = position.coords.latitude;
  let currentLongitude = position.coords.longitude;

  let positionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitute}&lon=${currentLongitude}&appid=${key}&units=metric`;

  axios.get(positionUrl).then(showCurrentCityWeather);
}

function geoLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", showTempCels);

let fahrButton = document.querySelector("#fahrenheit");
fahrButton.addEventListener("click", showTempFahr);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", geoLocation);
