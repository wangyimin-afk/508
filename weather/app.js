const apiKey = window.WEATHER_API_KEY || 'YOUR_API_KEY_HERE';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');

searchBtn.addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) return;
    resultDiv.innerHTML = '';
    loadingDiv.classList.remove('hidden');
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        resultDiv.textContent = err.message;
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

function displayWeather(data) {
    resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}&deg;C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}
