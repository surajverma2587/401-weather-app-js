const searchForm = document.getElementById("searchForm");

const renderErrorMessage = () => {
  // target parent
  const searchInputContainer = document.getElementById("searchInputContainer");

  // construct error message element
  const errorMessage = document.createElement("div");
  errorMessage.setAttribute("class", "form-text text-danger");
  errorMessage.setAttribute("id", "errorMessage");
  errorMessage.textContent = "Please enter a city name.";

  // append error message element
  searchInputContainer.appendChild(errorMessage);
};

const clearErrorMessage = () => {
  const errorMessage = document.getElementById("errorMessage");

  if (errorMessage) {
    errorMessage.remove();
  }
};

const renderErrorAlert = () => {
  // target parent
  const weatherInfo = document.getElementById("weatherInfo");

  weatherInfo.innerHTML = `<div class="alert alert-info" role="alert">No weather info found!</div>`;
};

const getWeatherInfoByCity = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8109f605d79877f7488a194794a29013`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const constructWeatherCard = (weatherData) => {
  // target parent
  const weatherInfo = document.getElementById("weatherInfo");

  // construct weather card
  const weatherCard = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">${weatherData.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${weatherData.weather[0].description.toUpperCase()}</h6>
      <ul class="list-group">
        <li class="list-group-item">
          <div class="d-flex justify-content-between">
            <div>Temperature</div>
            <div>${weatherData?.main?.temp}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex justify-content-between">
            <div>Pressure</div>
            <div>${weatherData.main.pressure}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex justify-content-between">
            <div>Wind Speed</div>
            <div>${weatherData.wind.speed}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex justify-content-between">
            <div>Humidity</div>
            <div>${weatherData.main.humidity}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>`;

  // set parent HTML with weather card
  weatherInfo.innerHTML = weatherCard;
};

const renderWeatherInfo = async (cityName) => {
  // get data from API for cityName
  const weatherData = await getWeatherInfoByCity(cityName);

  if (weatherData) {
    constructWeatherCard(weatherData);
  } else {
    renderErrorAlert();
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  // get input value
  const searchInput = document.getElementById("searchInput");
  const cityName = searchInput.value;

  // validation
  if (!cityName) {
    // render form error message
    renderErrorMessage();
  } else {
    clearErrorMessage();

    renderWeatherInfo(cityName);
  }
};

searchForm.addEventListener("submit", handleFormSubmit);
