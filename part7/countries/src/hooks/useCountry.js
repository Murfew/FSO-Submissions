import axios from 'axios'
import { useState, useEffect } from 'react'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        )
        const result = response.data

        setCountry({
          found: true,
          data: {
            name: result.name.common,
            capital: result.capital[0],
            population: result.population,
            flag: result.flags.png,
          },
        })
      } catch (error) {
        setCountry({ found: false })
      }
    }

    getCountry()
  }, [name])

  return country
}

export default useCountry
