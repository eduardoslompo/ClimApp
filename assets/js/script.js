//Selections variables
const apiKey = "32a7c580fb3d86c2a8fb35cdbd092d86";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');

const loader = document.querySelector("#loader");
const errorMessage = document.querySelector("#error-message");

//Functions
const toggleLoader = () => {
    loader.classList.toggle("hide");
}

const hideInformation = () => {
    weatherContainer.classList.add("hide");
    errorMessage.classList.add("hide");
}

const showErrorMessage = () => {
    errorMessage.classList.remove("hide");
}

const getWeatherData = async (city) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
}

const showWeatherData = async (city) => {
    hideInformation();

    const data = await getWeatherData(city);

    if(data.cod === "404"){
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
}



//Events
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city);
    }
});