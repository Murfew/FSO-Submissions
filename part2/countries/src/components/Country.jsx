const Country = ({country}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map(key => (
          <li id={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
    </div>
  )
}

export default Country
