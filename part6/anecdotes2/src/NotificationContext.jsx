import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `anecdote ${action.payload} voted`
    case 'CREATE':
      return `anecdote ${action.payload} created`
    case 'CLEAR':
      return ''
    case 'ERROR':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

// eslint-disable-next-line react/prop-types
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
