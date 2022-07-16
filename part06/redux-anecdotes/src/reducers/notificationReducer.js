import { createSlice } from '@reduxjs/toolkit'

const startingNotification = {
  header: 'Notification',
  message: 'This component is working as intended!'
}

const initialState = startingNotification
let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationSet(state, action) {
      return state = action.payload
    },
    notificationReset(state, action) {
      return state = { header: null, notification: null }
    }
  }
})

export const showNotification = (notification, time) => {
  return dispatch => {
    if(timeoutID) clearTimeout(timeoutID)
    dispatch(notificationSet(notification))
    timeoutID = setTimeout(() => dispatch(notificationReset()), time * 1000)
  }
}

export const { notificationSet, notificationReset } = notificationSlice.actions
export default notificationSlice.reducer