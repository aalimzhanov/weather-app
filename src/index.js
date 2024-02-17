const apiKey = "979dc5d60c4f4813bb4144636240202 ";

function fetchWeather(apiUrl) {
	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			const weatherCurrent = document.getElementById("weather-current");
			const cityName = data.location.name;
			const region = data.location.region;
			const temperature = data.current.temp_c;
			const condition = data.current.condition.text;
			const icon = data.current.condition.icon;
			weatherCurrent.innerHTML = `
            <h2>${cityName}</h2>
            <h3>${region}</h3>
            <p>Current Temperature: ${temperature}° C</p>
            <img class="weather-icon" src="https:${icon}">
            <p>${condition}</p>
        `;

			for (let i = 0; i < data.forecast.forecastday.length; i++) {
				const day = document.getElementById(`day-${i}`);
				const date = data.forecast.forecastday[i].date;
				const maxTemp = data.forecast.forecastday[i].day.maxtemp_c;
				const minTemp = data.forecast.forecastday[i].day.mintemp_c;
				const condition = data.forecast.forecastday[i].day.condition.text;
				const icon = data.forecast.forecastday[i].day.condition.icon;
				day.innerHTML = `
                <h2>${date}</h2>
                <p>Highest temperature: ${maxTemp}° C</p>
                <p>Lowest temperature: ${minTemp}° C</p>
                <img class="weather-icon" src="https:${icon}">
                <p>${condition}</p>
            `;
			}
		})
		.catch((error) => {
			console.error("Error fetching weather data:", error);
		});
}

document
	.getElementById("city-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const cityName = document.getElementById("city-name").value;
		const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`;
		fetchWeather(apiUrl);
	});

document.addEventListener("DOMContentLoaded", () => {
	fetchWeather(
		`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Toronto&days=3&aqi=no&alerts=no`
	);
});
