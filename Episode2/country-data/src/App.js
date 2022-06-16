import React, { useState, useEffect } from "react"
import axios from "axios"
import ShowList from "./components/ShowListCountries"

const App = () => {
	const [country, setCountry] = useState([])
	const [filter, setFilter] = useState("")
	const [ShowOneCountry, setShowOneCountry] = useState(false)
	const [Countrytoshow, setCountrytoshow] = useState({})
	const hook = () => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountry(response.data)
		})
	}
	useEffect(hook, [])
	const filteredCountries = country.filter((country) =>
		country.name.common.toLowerCase().includes(filter.toLowerCase())
	)
	const handlefilterChange = (event) => {
		setFilter(event.target.value)
		setShowOneCountry(false)
		setCountrytoshow({})
	}
	return (
		<div>
			<div>
				<b>
					Find Countries <input value={filter} onChange={handlefilterChange} />
				</b>
			</div>
			<ShowList
				filteredCountries={filteredCountries}
				ShowOneCountry={ShowOneCountry}
				setShowOneCountry={setShowOneCountry}
				Countrytoshow={Countrytoshow}
				setCountrytoshow={setCountrytoshow}
			/>
		</div>
	)
}

export default App
