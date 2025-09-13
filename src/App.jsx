import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [data, setData] = useState(null);

	async function searchWeather(e) {
		e?.preventDefault();
		const q = query.trim();
		if (!q) return;
		if (!API_KEY) {
			setError("Missing API key. Add VITE_WEATHER_API_KEY to .env");
			return;
		}
		setLoading(true);
		setError("");
		setData(null);
		try {
			const url = new URL("https://api.weatherapi.com/v1/current.json");
			url.searchParams.set("key", API_KEY);
			url.searchParams.set("q", q);
			url.searchParams.set("aqi", "no");
			const res = await fetch(url.toString());
			if (!res.ok) throw new Error(`Request failed: ${res.status}`);
			const json = await res.json();
			setData(json);
		} catch (err) {
			setError(err.message || "Failed to fetch weather");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="container">
			<h1 className="title">Weather App</h1>
			<form onSubmit={searchWeather} className="form">
				<input
					className="input"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Enter city (e.g., London)"
				/>
				<button className="button" type="submit" disabled={loading}>
					{loading ? "Searching…" : "Search"}
				</button>
			</form>

			{error && <p className="error">{error}</p>}

			{data && (
				<div className="card">
					<h2 className="cardHeader">
						{data.location.name}, {data.location.country}
					</h2>
					<div className="row">
						<img
							src={"https:" + data.current.condition.icon}
							alt={data.current.condition.text}
							width={64}
							height={64}
						/>
						<div>
							<div className="temp">{data.current.temp_c}°C</div>
							<div className="muted">{data.current.condition.text}</div>
						</div>
					</div>
					<div className="grid">
						<div>Feels like: {data.current.feelslike_c}°C</div>
						<div>Humidity: {data.current.humidity}%</div>
						<div>Wind: {data.current.wind_kph} kph</div>
						<div>Cloud: {data.current.cloud}%</div>
					</div>
					<div className="updated">
						Last updated: {data.current.last_updated}
					</div>
				</div>
			)}

			{!data && !loading && !error && (
				<p className="hint">Search any city worldwide.</p>
			)}
		</div>
	);
}
