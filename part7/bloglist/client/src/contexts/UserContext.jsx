import { createContext, useContext, useReducer } from 'react'

const userReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.payload

    case 'REMOVE':
      return ''

    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUSer must be used witin UserContextProvider')
  }
  return context
}

export default UserContext
