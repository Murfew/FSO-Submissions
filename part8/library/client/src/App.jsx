import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client/react'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(
        `New book added: ${addedBook.title} by ${addedBook.author.name}`
      )
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <Link to='/'>
          <button>authors</button>
        </Link>
        <Link to='/books'>
          <button>books</button>
        </Link>
        {token ? (
          <Link to='/newBook'>
            <button>add book</button>
          </Link>
        ) : null}
        {token ? (
          <Link to='/recommend'>
            <button>recommend</button>
          </Link>
        ) : null}
        {!token ? (
          <Link to='/login'>
            <button>login</button>
          </Link>
        ) : null}
        {token ? <button onClick={logout}>logout</button> : null}
      </div>

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/newBook' element={<NewBook />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/recommend' element={<Recommend />} />
      </Routes>
    </div>
  )
}

export default App
