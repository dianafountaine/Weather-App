function FormatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    return `${day} ${hours}:${minutes}`;
  }
  
  function displayWeatherCondition(response) {
    let iconElement = document.querySelector("#icon");
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#condition").innerHTML =
      response.data.weather[0].description;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }

  
  
  function searchCity(city) {
    let apiKey = "ba381ba7f5af0b2afdddc476b2f74382";
    let units = "imperial";
    let endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let apiUrl = `${endPoint}${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "ba381ba7f5af0b2afdddc476b2f74382";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
      position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  function convertoToCelsius(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let celsiusTemperature = (fahrenheitTemperature -32)* 5/9;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
  
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature) ;
  }
  
  
  // feature 1
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = FormatDate(currentTime);
  // feature 2
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertoToCelsius);

  
  searchCity("Sacramento");