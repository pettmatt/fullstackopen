import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ 
    handleSubmit, handleUsernameChange, handlePasswordChange, 
    username, password
  }) => {
    
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="loginButton" type="submit">Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login