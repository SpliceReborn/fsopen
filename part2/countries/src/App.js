import axios from 'axios'
import { useState,  useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const [search, setSearch] = useState('')
  function handleChange(event) {
    setSearch(event.target.value)
  }

  const matched = countries.filter(country => country.name.common.toLowerCase().includes(search))

  // No need to useState because search field rerenders view anyway..
  let display = <></>
  if (matched.length === 1) {
    const country = matched[0]
    const name = country.name.common //country's name is an object
    console.log(country)
    display = 
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
      </div>
  } else if (matched.length < 10) {
    display = matched.map(country => <p key={country.name.common}>{country.name.common}</p>)
  } else {
    display = <p>Too many matches, specify another filter</p>
  }

  return (
    <div>
      <p>find countries <input value={search} onChange={handleChange}/></p>
      { !!search && display }
    </div>
  );
}

export default App;
