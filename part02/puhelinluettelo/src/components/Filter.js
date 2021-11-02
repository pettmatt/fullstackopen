const Filter = ({ handleFilterChange }) => {
  return(
    <>
      <h2>Filter</h2>
      Search by name: <input onChange={handleFilterChange} />
    </>
  )
}

export default Filter