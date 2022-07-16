// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 15
  }

  const header = props.notification.header
  const message = props.notification.message

  if(message === 'This component is working as intended!') return
  else if(!message) return

  return (
    <div style={style}>
      <h3>{ header }</h3>
      <p>{ message }</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectNotification = connect(mapStateToProps)(Notification)
export default ConnectNotification