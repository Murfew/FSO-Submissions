import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'
import blogService from '../services/blogs'

import { useRef } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  Typography,
  Box,
} from '@mui/material'

const BlogsPage = ({ blogs, notificationFn }) => {
  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const byLikes = (a, b) => b.likes - a.likes

  const handleCreate = async (blog) => {
    newBlogMutation.mutate(blog)
    notificationFn(`Blog created: ${blog.title}, ${blog.author}`)
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>

      <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
        Blogs
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.light' }}>
              <TableCell
                sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}
              >
                Author
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.sort(byLikes).map((blog) => (
              <TableRow key={blog.id} hover>
                <TableCell>
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default BlogsPage
