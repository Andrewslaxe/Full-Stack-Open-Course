import { useEffect, useState } from 'react'

const COUNTRY_URL = 'https://restcountries.com/v3.1/name/'
const WEATHER_URL = 'http://api.weatherstack.com/current?'
const API_WEATHER = import.meta.env.VITE_WEATHER_KEY

export default function App () {
  const [filter, setFilter] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    if (filter !== '') {
      fetch(`${COUNTRY_URL}${filter}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== 404 && data.message !== 'Page Not Found') {
            setCountriesToShow(data)
          }
        })
    } else {
      setCountriesToShow([])
    }
  }, [filter])
  return (
    <div>
      <form>
        <label>Find countries:</label>
        <input onChange={(e) => setFilter(e.target.value)} />
      </form>
      <div className='showCountries'>
        {countriesToShow.length > 10 || countriesToShow.length === 0
          ? <div>Change the filter too much countries </div>
          : <ShowCountries countries={countriesToShow} />}
      </div>
    </div>
  )
}

const ShowCountries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState([])
  const handleClick = (countrySelected) => {
    setSelectedCountry(countrySelected)
  }

  const country = countries.length === 1
    ? countries[0]
    : (selectedCountry.length === 0 ? undefined : selectedCountry)

  return (country)
    ? <ShowCountry country={country} />
    : countries.map((country, idx) => (
      <div key={idx}>{country.name.common}
        <button onClick={() => handleClick(country)}>Show</button>
      </div>
    ))
}

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState({})
  const [image, setImage] = useState('')
  console.log(`${WEATHER_URL}access_key=${API_WEATHER}&query=${country.capital[0]}`)
  useEffect(() => {
    fetch(`${WEATHER_URL}access_key=${API_WEATHER}&query=${country.capital[0]}`)
      .then(response => response.json())
      .then(data => {
        setWeather(data.current)
        setImage(data.current.weather_icons[0])
      })
  }, [country])

  return (
    <div>
      <div className='name'>{country.name.common}</div>
      <div className='capital'>Capital: {country.capital[0]}</div>
      <div className='population'>Population: {country.population}</div>
      <ul className='languages'>Languages:
        {Object.keys(country.languages).map((lan, idx) => <li key={idx}>{country.languages[lan]}</li>)}
      </ul>
      <img src={country.flags.svg} className='flag' />
      <div className='weather'>
        Weather in {country.capital[0]}
        <div>Temperature: {weather.temperature}</div>
        <img src={image} />
        <div>Wind: {weather.wind_speed} mph direction {weather.wind_dir}</div>
      </div>
    </div>
  )
}
