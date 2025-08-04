const Search = ({searchText, onChange}) => {
  return (
    <div>Find countries <input type="text" value={searchText} onChange={onChange}/></div>
  )
}

export default Search
