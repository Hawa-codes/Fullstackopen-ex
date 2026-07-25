import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])


  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const showCountryDetails = (country) => {
    setSearch(country.name.common)
  }

  
  return (
    <div>
      <p>Find countries: <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} /></p>
      <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area}</p>
          <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} />
          <h3>Languages:</h3>
          <ul>
            {Object.values(filteredCountries[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
      ) : (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>{country.name.common} <button onClick={() => showCountryDetails(country)}>Show</button></li>
          ))}
        </ul>
      )}
    </div>
    </div>
  )
}

export default App
