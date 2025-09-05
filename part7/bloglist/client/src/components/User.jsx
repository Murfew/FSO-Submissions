import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }} elevation={3}>
        <Typography variant='h5' gutterBottom>
          {user.name}
        </Typography>

        <Typography variant='h6' gutterBottom>
          Added blogs
        </Typography>

        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id} disablePadding>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default User
