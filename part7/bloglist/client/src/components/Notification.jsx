import { Alert, Box } from '@mui/material'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const { message, type } = notification

  return (
    <Box sx={{ my: 2 }}>
      <Alert severity={type === 'success' ? 'success' : 'error'}>
        {message}
      </Alert>
    </Box>
  )
}

export default Notification
