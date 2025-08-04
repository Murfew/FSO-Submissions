import { useEffect, useState } from "react"
import countriesService from '../services/countries'
import Country from "./Country"
import CountryList from './CountryList'
import Search from "./Search"

const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setAllCountries(countries)
      })
  }, [])

  if (!allCountries) {
    return null
  }

  const handleSearch = (text) => {
    setSearch(text)
    setCountries(allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(text.toLowerCase()) ||
      country.name.official.toLowerCase().includes(text.toLowerCase())
    ))
  }

  return (
    <>
      <Search searchText={search} onChange={(event) => handleSearch(event.target.value) }/>
      {countries.length >= 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length > 1 ? (
        <CountryList countries={countries} />
      ) : countries.length === 1 ? (
        <Country country={countries[0]} />
      ) : null
    }
    </>
  )
}

export default App
