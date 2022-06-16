import React, { useState, useEffect } from "react"
import axios from "axios"

const Show = ({ Country }) => {
	const [weather, setWeather] = useState({})
	const api_weather = process.env.REACT_APP_API_KEY
	const url = `http://api.weatherstack.com/current?access_key=${api_weather}&query=${Country.capital}`
	const hook = () => {
		axios.get(url).then((response) => {
			setWeather(response.data)
		})
	}
	useEffect(hook, [url])
	return (
		<div>
			<h1>{Country.name.common}</h1>
			<div>
				<b>Capital:</b> {Country.capital}
			</div>
			<div>
				<b>Population:</b> {Country.population}
			</div>
			<h2>Languages</h2>
			<ul>
				{Object.keys(Country.languages || []).map((language) => (
					<li key={language}>{Country.languages[language]}</li>
				))}
			</ul>
			<img src={Country.flags.svg} alt={Country.name} width='200' />
			<h2>Weather in {Country.capital}</h2>
			<div>
				<b>Temperature:</b> {weather.current?.temperature}°C
				<div>
					<img src={weather.current?.weather_icons} alt={weather.current} />
				</div>
				<div>
					<b>Wind:</b> {weather.current?.wind_speed} mph direction{" "}
					{weather.current?.wind_dir}
				</div>
			</div>
		</div>
	)
}
export default Show
