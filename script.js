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

function updateContainerWidth() {
    const windowWidth = window.innerWidth; 
    const maxWidth = 800; 
    const desiredWidth = Math.min(windowWidth * 0.8, maxWidth); 
    const inputWidthPercentage = 70; 
    const searchWidthPercentage = 20; 
    
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
updateContainerWidth(); 


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

