const CountryList = ({countries, showCountry}) => {
  return (
    <>
   {countries.map((country) => <p key={country.name.common}>{country.name.common} <button onClick={() => showCountry(country)}>Show</button></p>)}
    </>
  )
}

export default CountryList
