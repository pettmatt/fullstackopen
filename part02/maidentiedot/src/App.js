import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [ query, setQuery ] = useState(true)
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState([])
  const [ weather, setWeather ] = useState([])

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())
  // If filter is used, 
  // check if name of a country contains a specific string. If it doesn't contain, return -1.
  const filteredResults = 
    !filter ? countries : countries.filter(country => country.name.toLowerCase().indexOf(filter) !== -1)

  // Fetch countries from restcountries.eu
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
        setCountries(res.data)
    })
  }, [])

  // Fetch weather information from api.weatherstack.com
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY
    if(filteredResults.length === 1 && query) {
      const capital = countries.map(country => country.capital)
      if(capital[0]) {
        axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital[0]}`)
        .then(res => {
          setWeather(res.data)
        })
        setQuery(false)
      }
    }
  }, [countries, filteredResults, query])

  return (
    <div>
      <input placeholder="Find countries" value={filter} onChange={handleFilterChange} />

      <Countries countryFilter={filteredResults} setFilter={setFilter} weather={weather} />
    </div>
  )
}

export default App