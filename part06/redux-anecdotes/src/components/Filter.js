// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filterSet } from '../reducers/filterReducer'

const Filter = (props) => {
  // const filter = useSelector(state => state.filter)
  // const dispatch = useDispatch()
  const filter = props.filter

  const handleChange = (event) => {
    const filterTerm = event.target.value
    // dispatch(filterSet(filterTerm))
    props.filterSet(filterTerm)
  }

  const style = {
    marginBottom: 30
  }

  return (
    <div style={style}>
      <h4>Filter anecdotes</h4>
      <div><input name='filter' onChange={handleChange} /></div>

      {(filter === null) ? 
      <small>Try filtering to find the perfect anecdote(s)</small>
      : ''}
    </div>
  )
}

const mapStateToProps = (state) => { return { filter: state.filter }}
const mapDispatchToProps = { filterSet }
const ConnectFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectFilter