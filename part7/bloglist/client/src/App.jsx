import { useState, useEffect, createRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useNotification } from './contexts/NotificationContext'
import { useUser } from './contexts/UserContext'
import Users from './pages/Users'

const App = () => {
  const [user, userDispatch] = useUser()
  const [notification, notificationDispatch] = useNotification()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      userDispatch({ type: 'SET', payload: user })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>Blog service not available due to problems in the server</div>
  }

  const blogs = result.data

  const blogFormRef = createRef()

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

  const handleCreate = async (blog) => {
    newBlogMutation.mutate(blog)
    notify(`Blog created: ${blog.title}, ${blog.author}`)
    blogFormRef.current.toggleVisibility()
  }

  const handleVote = async (blog) => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
    notify(`You liked ${blog.title} by ${blog.author}`)
  }

  const handleLogout = () => {
    userDispatch({ type: 'REMOVE' })
    storage.removeUser()
    notify(`Bye, ${user.name}!`)
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login doLogin={handleLogin} />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <Router>
        <Routes>
          <Route path='/users' element={<Users />} />
        </Routes>

        {/* <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <NewBlog doCreate={handleCreate} />
        </Togglable>
        {blogs.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleVote={handleVote}
            handleDelete={handleDelete}
          />
        ))} */}
      </Router>
    </div>
  )
}

export default App
