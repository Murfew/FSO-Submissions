import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'

const Header = ({ user, handleLogout }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        {/* Left side nav links */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color='inherit' component={Link} to='/'>
            Blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
        </Box>

        {/* Right side user + logout */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='body1'>{user.name} logged in</Typography>
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
