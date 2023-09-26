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
  }
};

searchForm.addEventListener("submit", handleFormSubmit);
