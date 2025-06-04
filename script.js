let floor = 1;
let maxFloor = 10;

function updateFloor() {
  document.getElementById('floor').textContent = floor;
  floor = floor < maxFloor ? floor + 1 : 1;
}

function fetchWeather() {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=39.90&longitude=116.40&current_weather=true';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.current_weather ? `${data.current_weather.temperature}°C` : '无法获取天气';
      document.getElementById('weather').textContent = weather;
    })
    .catch(() => {
      document.getElementById('weather').textContent = '无法获取天气';
    });
}

setInterval(updateFloor, 3000); // 模拟楼层变化
fetchWeather();
