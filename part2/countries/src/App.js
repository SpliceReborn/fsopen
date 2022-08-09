import axios from 'axios'
import { useState,  useEffect } from 'react';

const Country = ({country, weather}) => {
  const name = country.name.common
  return (
    <div>
      <h2>{name}</h2>
      <p>
        capital {country.capital} <br/>
        area {country.area}
      </p>
      <p><b>languages:</b></p>
      <ul>
        {
          Object.values(country.languages)
            .map(language => <li key={language}>{language}</li>)
        }
      </ul>
      <img width="175px" src={country.flags.png} alt={`${name}'s flag`} />
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.temp} Celsius</p>
      <img src={weather.image} alt="weather icon" />
      <p>wind {weather.wind} m/s</p>
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const [search, setSearch] = useState('')
  function handleChange(event) {
    setSearch(event.target.value)
    setCountryView({})
  }

  const [countryView, setCountryView] = useState({})
  function showCountry(country) {
    setCountryView(country)
  }
  const [weather, setWeather] = useState({
    temp: '',
    image: '',
    wind: ''
  })
  useEffect(() => {
    if (Object.keys(countryView).length !== 0) {
      const api_key = process.env.REACT_APP_API_KEY
      const lat = countryView.latlng[0]
      const lon = countryView.latlng[1]
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(response => {
          setWeather({
            temp: ((response.data.main.temp-273.15)*100/100).toFixed(2),
            image: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            wind: response.data.wind.speed,
          })
        })
    }
  }, [countryView])

  const matched = countries.filter(country => country.name.common.toLowerCase().includes(search))
  if (matched.length === 1 && matched[0] !== countryView) setCountryView(matched[0])

  return (
    <div>
      <p>find countries <input value={search} onChange={handleChange}/></p>
      { (!!search && matched.length !== 1) &&
          (matched.length < 10 ? 
            matched.map(country => <p key={country.name.common}>{country.name.common}
                &#160;<button onClick={() => showCountry(country)}>show</button>
              </p>
            ) :
            <p>Too many matches, specify another filter</p>
          )
      }
      {  // render one country view, above doesn't render when this does
        !!Object.keys(countryView).length && <Country country={countryView} weather={weather}/>
      }
    </div>
  );
}

export default App;
