import { useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Routes, Route, useMatch } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import storage from './services/storage'
import Login from './components/Login'
import Notification from './components/Notification'
import { useNotification } from './contexts/NotificationContext'
import { useUser } from './contexts/UserContext'
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import BlogsPage from './pages/BlogsPage'
import BlogPage from './pages/BlogPage'
import Header from './components/Header'

const App = () => {
  const [user, userDispatch] = useUser()
  const [notification, notificationDispatch] = useNotification()

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      userDispatch({ type: 'SET', payload: user })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (blogsQuery.isLoading || usersQuery.isLoading)
    return <p>Loading data...</p>
  if (blogsQuery.isError) return <p>Error with the blog server</p>
  if (usersQuery.isError) return <p>Error with the user server</p>

  const blogs = blogsQuery.data
  const users = usersQuery.data

  const notify = (payload, type = 'SUCCESS') => {
    notificationDispatch({ type, payload })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      userDispatch({ type: 'SET', payload: user })
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify('Wrong credentials', 'ERROR')
    }
  }

  const handleLogout = () => {
    userDispatch({ type: 'REMOVE' })
    storage.removeUser()
    notify(`Bye, ${user.name}!`)
  }

  if (!user) {
    return (
      <div>
        <h2>blog app</h2>
        <Notification notification={notification} />
        <Login doLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <Notification notification={notification} />

      <h2>blog app</h2>

      <Routes>
        <Route path='/users' element={<UsersPage users={users} />} />
        <Route path='/users/:id' element={<UserPage users={users} />} />
        <Route
          path='/'
          element={<BlogsPage blogs={blogs} notificationFn={notify} />}
        />
        <Route
          path='/blogs/:id'
          element={<BlogPage blogs={blogs} notificationFn={notify} />}
        />
      </Routes>
    </div>
  )
}

export default App
