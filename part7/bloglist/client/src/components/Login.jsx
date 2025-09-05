import { useState } from 'react'

import { Box, Button, TextField, Typography, Paper } from '@mui/material'

const Login = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    doLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        mt: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 400, width: '100%' }}
        component='form'
        onSubmit={handleLogin}
      >
        <Typography variant='h5' gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label='Username'
          variant='outlined'
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  )
}

export default Login
