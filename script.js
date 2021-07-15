/* SHOW DATE SETTING*/
let now = new Date();
console.log(now);

let time = now.getHours();
console.log(time);

let mins = now.getMinutes();
console.log(mins);

let date = now.getDate();
console.log(date);

let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
console.log(day);

let year = now.getFullYear();
console.log(year);

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
console.log(month);

let currentDate = `Today is ${day}, ${month} ${date}, ${year}`;
console.log(currentDate);

let latest = document.querySelector(".dates");
latest.innerHTML = `${day}, ${month} ${date}, ${year} ${time} : ${mins}`;
console.log(latest);

/* SHOW CITYSETTINGS*/
function showCity(event) {
  event.preventDefault();
  let newSearch = document.querySelector("#citysearch");
  let h1 = document.querySelector("h1");
  h1.innerHTML = newSearch.value;

  /* API SETTINGS*/
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newSearch.value}&appid=6e6043caaf0534cd48911364f0aa23f7&units=metric`;
  console.log(apiUrl);

  axios
    .get(`${apiUrl}&appid=6e6043caaf0534cd48911364f0aa23f7`)
    .then(showTemperature);

  /* SHOW CITY TEMP*/
  function showTemperature(response) {
    let temp = Math.round(response.data.main.temp);
    console.log(temp);

    let cityTemp = document.querySelector(".temp");
    cityTemp.innerHTML = ` ${temp}°C`;

    let tempStats = document.querySelector("p.temp-text");
    tempStats.innerHTML = response.data.weather[0].description;

    let humidStats = document.querySelector("#humidity");
    humidStats.innerHTML = response.data.main.humidity;

    let windStats = document.querySelector("#wind");
    windStats.innerHTML = Math.round(response.data.wind.speed);

    let iconImg = document.querySelector("#icon");
    iconImg.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    navigator.geolocation.getCurrentPosition(showTemperature);
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

/* CURRENT LOCATION STATS*/
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(position.coords.latitude);
  console.log(position.coords.longiatude);

  let apiKey = "6e6043caaf0534cd48911364f0aa23f7";
  let logUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  console.log(logUrl);

  let button = document.querySelector(".status");
  button.addEventListener("click", showPosition);

  navigator.geolocation.getCurrentPosition(showPosition);

  axios.get(logUrl).then(showPosition);
}
