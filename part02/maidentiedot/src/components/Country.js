import React from 'react'
import Weather from './Weather'

const Country = ({ country, weather }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <h4><i>{country.nativeName}</i></h4>
      <p>capital: {country.capital}</p>
      <p>population: {new Intl.NumberFormat('fi-FI').format(country.population)}</p>

      <h3>Languages</h3>
      <ul>
        {country.languages.map((language, index) => 
          <li key={index}>
            {language.name} / {language.nativeName}
          </li>
        )}
      </ul>
      <img alt={'Flag of ' + country.name} src={country.flag} />
      <Weather weather={weather} />
    </>
  )
}

export default Country