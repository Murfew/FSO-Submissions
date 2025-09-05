import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material'

const UsersPage = ({ users }) => {
  if (!users) {
    return null
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }} elevation={3}>
        <Typography variant='h5' gutterBottom>
          Users
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell
                  sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}
                >
                  # of blogs
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Link
                      to={`/users/${user.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default UsersPage
