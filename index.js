let now = new Date();
let h2 = document.querySelector("h2");
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
h2.innerHTML = `${month} ${date}, ${year} ${hours}:${minutes} ${meridiem}`;

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h3").innerHTML = Math.round(response.data.main.temp);
}

function searchCity(city) {
  let apiKey = "b301e19a2ae0177ab1e38505a40d92bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
