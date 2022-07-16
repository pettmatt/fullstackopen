import { createSlice } from '@reduxjs/toolkit'

const startingNotification = {
  header: 'Notification',
  message: 'This component is working as intended!'
}

const initialState = startingNotification

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
  return async dispatch => {
    dispatch(notificationSet(notification))
    setTimeout(() => dispatch(notificationReset()), time * 1000)
  }
}

export const { notificationSet, notificationReset } = notificationSlice.actions
export default notificationSlice.reducer