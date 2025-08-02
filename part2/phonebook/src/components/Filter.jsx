const Filter = ({filter,onFilterChange}) => {
  return (
    <div>
        Show names containing: <input value={filter} onChange={onFilterChange}/>
    </div>
  )
}

export default Filter
