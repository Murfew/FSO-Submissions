import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return { message: action.payload, type: 'success' }

    case 'ERROR':
      return { message: action.payload, type: 'error' }

    case 'CLEAR':
      return ''

    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within NotificationContextProvider'
    )
  }
  return context
}

export default NotificationContext
