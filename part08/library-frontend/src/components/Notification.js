const Notification = ({ message, type='Notification' }) => {
  if (!message) return null

  return (
    <div>
      <h3>{ type }</h3>
      <p>{ message }</p>
    </div>
  )
}

export default Notification