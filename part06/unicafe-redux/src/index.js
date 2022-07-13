import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const actionEvent = (type = 'OK') => {
    store.dispatch({ type })
  }

  return (
    <div>
      <button onClick={() => actionEvent('GOOD')}>good</button>
      <button onClick={() => actionEvent('OK')}>ok</button>
      <button onClick={() => actionEvent('BAD')}>bad</button>
      <button onClick={() => actionEvent('ZERO')}>reset stats</button>
      <div>good <span>{store.getState().good}</span></div>
      <div>ok <span>{store.getState().ok}</span></div>
      <div>bad <span>{store.getState().bad}</span></div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
