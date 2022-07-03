import React from 'react'

const Notification = ({ errorMessage, notificationMessage }) => {
  
  const notificationStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 3,
    borderRadius: 3,
    marginBottom: 10,
    maxWidth: 350,
    minWidth: 200
  }

  if(errorMessage || notificationMessage) return (
    <div style={notificationStyle}>
      <h3>{ (notificationMessage) ? 'Notification' : 'Error' }</h3>
      <p>{errorMessage || notificationMessage}</p>
    </div>
  )
}

export default Notification