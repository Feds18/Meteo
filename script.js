const city = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const max = document.querySelector('.max');
const min = document.querySelector('.min');
const input = document.querySelector('#locationInput');
const search = document.querySelector('#searchButton');
const apiKey = '9bdbeebae54fd776459e8ada1c58313c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherInfo = document.querySelector('.temperature_section');
const container = document.querySelector('.container');
const RecentButtons = document.querySelector('.buttonsRecent');
var CityList = [];
var FoundCity = false;
// Aggiorna la larghezza del container in base alla larghezza della finestra
function updateContainerWidth() {
    const windowWidth = window.innerWidth; // Window width
    const maxWidth = 800; // Maximum width for container
    const desiredWidth = Math.min(windowWidth * 0.8, maxWidth); // Desired width for container as 80% of window width or maximum width
    const inputWidthPercentage = 70; // Desired width for input field as a percentage of the container's width
    const searchWidthPercentage = 20; // Desired width for search button as a percentage of the container's width

    // Select the container, input field, and search button
    const container = document.querySelector('.container');
    const input = document.querySelector('#locationInput');
    const search = document.querySelector('#searchButton');

    // Update the width of the container
    if (container) {
        container.style.width = desiredWidth + 'px';
    }

    // Update the width of the input field
    if (input) {
        const inputWidth = (desiredWidth * inputWidthPercentage) / 100; // Calculate the input field width based on the desired percentage
        input.style.width = inputWidth + 'px';
    }

    // Update the width of the search button
    if (search) {
        const searchWidth = (desiredWidth * searchWidthPercentage) / 100; // Calculate the search button width based on the desired percentage
        search.style.width = searchWidth + 'px';
    }
}

// Call the function initially and when the window is resized
window.addEventListener('resize', updateContainerWidth);
updateContainerWidth(); // Call the function initially


input.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        search.click();
    }
});


search.addEventListener('click', () => {
    const location = input.value;
    fetchWeather(location);

});
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            city.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            max.textContent = `Max: ${Math.round(data.main.temp_max)}°C`;
            min.textContent = `Min: ${Math.round(data.main.temp_min)}°C`;
            const description = data.weather[0].description;
            input.value = '';
            var Name = data.name;
            createRecentButtons(Name);

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
function createRecentButtons(cityName) {
    let FoundCity = false; // Reset FoundCity for each iteration
    for (let i = 0; i < CityList.length; i++) {
        if (CityList[i] == cityName) {
            FoundCity = true;
            break;
        }
    }
    if (!FoundCity) { // Only add the city if it's not found in the list
        if (CityList.length >= 5) {
            var lastcity = RecentButtons.children[RecentButtons.children.length - 1];
            lastcity.remove();
        }
        CityList.push(cityName);
        const button = document.createElement('button');
        button.textContent = cityName;
        button.classList.add('recentCityButton');
        button.addEventListener('click', () => {
            fetchWeather(cityName);
        });
        RecentButtons.appendChild(button);

    }
}

