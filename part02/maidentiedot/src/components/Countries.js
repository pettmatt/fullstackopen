import React from 'react'
import Country from './Country'

const Countries = ({ countryFilter, setFilter, weather }) => {
  if(countryFilter.length > 1 && countryFilter.length <= 10) {
    return (
      <ul>
        Found <span>{countryFilter.length}</span> countries.
        {countryFilter.map((country, index) => 
          <li key={index}>
            {country.name} <button onClick={() => setFilter(country.name.toLowerCase())}>Show details</button>
          </li>
        )}
      </ul>
    )
  }
  else if(countryFilter.length === 1) {
    return (
      <Country country={countryFilter[0]} weather={weather} />
    )
  }
  else {
    return(
      <p>Too many matches.</p>
    )
  }
}

export default Countries