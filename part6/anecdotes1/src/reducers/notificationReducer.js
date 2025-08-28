import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    },
  },
})

export const notify = (message, duration) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
