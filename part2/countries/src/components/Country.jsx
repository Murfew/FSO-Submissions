import { useEffect, useState } from "react"
import weatherService from '../services/weather'

const Country = ({country}) => {

  const [weather, setWeather] = useState(null)
  const [icon, setIcon] = useState('')

  useEffect(() => {
    weatherService
      .getInfo(country.latlng[0], country.latlng[1])
      .then(weather => setWeather(weather))
  }, [])

  useEffect(() => {
    if (weather) {
    weatherService
      .getImg(weather.current.weather.icon)
      .then(icon => setIcon(icon))
    }
  }, [weather])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map(key => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {weather.current.temp} &deg;C</p>
      <img src={icon} alt='Icon of current weather' />
      <p>Wind: {weather.current.wind_speed} m/s</p>
    </div>
  )
}

export default Country
