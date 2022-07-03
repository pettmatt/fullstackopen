import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [ query, setQuery ] = useState(true)
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState([])
  const [ weather, setWeather ] = useState([])

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())

  // Fetch countries from restcountries.com
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(res => {
      setCountries(res.data)
    })
  }, [])

  // Filter countries based on if country includes specific character string
  const filteredResults = countries.filter(country => country.name.common.toLowerCase().includes(filter))

  // Fetch weather information from api.weatherstack.com
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY
    if(filteredResults.length === 1 && query) {
      const capital = countries.map(country => country.capital)
      if(capital[0]) {
        axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital[0]}`)
        .then(res => {
          setWeather(res)
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