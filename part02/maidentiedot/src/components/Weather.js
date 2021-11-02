import React from 'react'

const Weather = ({ weather }) => {
  //console.log(weather)
  return (
    <div>
      <h3>Local weather</h3>
      <p>local time: {weather.location.localtime}</p>
      <p>temperature: {weather.current.temperature}</p>
      <img alt='weather-icon' src={weather.current.weather_icons[0]} />
      <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Weather