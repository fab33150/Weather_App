const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const body = document.querySelector("body");

const updateUI = (data) => {
  const { cityDetails, weather } = data;
  console.log(data);

  //updated details template
  details.innerHTML = ` 
  <h5 class="my-3">${cityDetails.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
      <span>${weather.Temperature.Imperial.Value}</span>
      <span>&deg;F</span>
  </div>
  `;

  //update icon and day & night imgs
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;

  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
    body.style.background = "#FFFF8A";
  } else {
    timeSrc = "img/night.svg";
    body.style.background = "#050A30";
  }
  time.setAttribute("src", timeSrc);

  //remove d-none class to showcase weather details
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  //stop page from refreshing
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //updated city

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storage

  localStorage.setItem("loc", city);
});

if (localStorage.getItem("loc")) {
  updateCity(localStorage.getItem("loc"))
    .then((data) => updatedUI(data))
    .catch((err) => console.log(err));
}
