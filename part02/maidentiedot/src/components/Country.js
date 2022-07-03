import React from 'react'
import Weather from './Weather'

const Country = ({ country, weather }) => {
  
  return (
    <>
      <h2>{country.name.official}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {new Intl.NumberFormat('fi-FI').format(country.population)}</p>
      <p>region: {country.region}</p>
      <p>{(country.landlocked) ? 'Doesn\'t have sea access' : 'Has sea access'}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => 
          <li key={index}>
            {language}
          </li>
        )}
      </ul>
      <img alt={'Flag of ' + country.name.common} src={country.flags.png} />
      <img alt={'Coats of arms of ' + country.name.common} src={country.coatOfArms.png} />
      
      {/* <Weather weather={weather} /> */}
    </>
  )
}

export default Country