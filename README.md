# Weather App

This repository contains a simple weather search interface located in the `weather/` directory.

## How to Run

1. Navigate to the `weather` folder.
2. Open `index.html` in your browser.

```
open weather/index.html
```

The page allows you to search for the current weather of a city using the OpenWeatherMap API.

## API Key Configuration

The application requires an API key from [OpenWeatherMap](https://openweathermap.org/api). You can supply the key by defining a global JavaScript variable before loading `app.js` or by replacing the placeholder in `weather/app.js`.

Example using a script tag in `index.html`:

```html
<script>
  window.WEATHER_API_KEY = 'YOUR_ACTUAL_API_KEY';
</script>
<script src="app.js"></script>
```

Alternatively, edit `weather/app.js` and replace `YOUR_API_KEY_HERE` with your key.

## Screenshot

![Screenshot](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==)

