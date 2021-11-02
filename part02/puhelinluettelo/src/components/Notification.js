const Notification = ({ header, message }) => {
  return(
    <div>
      <h2>{header}</h2>
      <p>{message}</p>
    </div>
  )
}

export default Notification