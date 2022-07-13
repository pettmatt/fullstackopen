import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 15
  }

  if(notification.header === 'Notification' && 
  notification.message === 'This component is working as intended!') return
  else if(!notification.message) return

  return (
    <div style={style}>
      <h3>{ notification.header }</h3>
      <p>{ notification.message }</p>
    </div>
  )
}

export default Notification