function formatDate(timestamp) {
  let now = new Date(timestamp);
  let h1 = document.querySelector("h1");
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
  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let meridiem = "AM";
  if (hours > 12) {
    hours = hours - 12;
    meridiem = "PM";
  }
  h1.innerHTML = `${month} ${date}, ${year} ${hours}:${minutes} ${meridiem}`;
  return `${month} ${date}, ${year} ${hours}:${minutes} ${meridiem}`;
}
formatDate(new Date());

function displayWeatherCondition(response) {
  document.querySelector.innerHTML = response.data.city;
  document.querySelector.innerHTML = Math.round(
    response.data.temperature.current
  );

  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  //set weather icon
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
}

function searchCity(city) {
  let apiKey = "53ab2140f215ee6a91f254aoaedc8t9d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Null");
