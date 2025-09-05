import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './contexts/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

import App from './App'
import { NotificationContextProvider } from './contexts/NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Router>
          <CssBaseline />
          <App />
        </Router>
      </UserContextProvider>
    </QueryClientProvider>
  </NotificationContextProvider>
)
