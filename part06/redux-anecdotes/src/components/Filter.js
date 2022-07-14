import { useSelector, useDispatch } from 'react-redux'
import { filterSet } from '../reducers/filterReducer'

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterTerm = event.target.value
    dispatch(filterSet(filterTerm))
  }

  const style = {
    marginBottom: 30
  }

  return (
    <div style={style}>
      <h4>Filter anecdotes</h4>
      <div><input name='filter' onChange={handleChange} /></div>

      { (filter === null) ? 
      <small>Try filtering to find the perfect anecdote(s)</small>
      : '' }
    </div>
  )
}

export default Filter