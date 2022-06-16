import Show from "./Country"

const ShowList = ({
	filteredCountries,
	ShowOneCountry,
	setShowOneCountry,
	Countrytoshow,
	setCountrytoshow,
}) => {
	const handlecountry = (country) => {
		setShowOneCountry(true)
		setCountrytoshow(country)
	}
	const DisplayCountry = ({ filteredCountries }) => {
		if (filteredCountries.length > 10) {
			return <div>Too many matches, specify another filter</div>
		} else if (filteredCountries.length === 1) {
			return <Show Country={filteredCountries[0]} />
		} else {
			return filteredCountries.map((country) => (
				<div key={country.name.official}>
					{country.name.common}
					<button onClick={() => handlecountry(country)}>Show</button>
				</div>
			))
		}
	}
	const countrys = ShowOneCountry ? (
		<Show Country={Countrytoshow} />
	) : (
		DisplayCountry({ filteredCountries })
	)
	return <div>{countrys}</div>
}
export default ShowList
