import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Link,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import {
  Favorite,
  FavoriteBorder,
  Delete,
  Add,
  Person,
} from '@mui/icons-material'

import storage from '../services/storage'
import blogService from '../services/blogs'

const Blog = ({ blog, notificationFn }) => {
  const queryClient = useQueryClient()
  const navigagte = useNavigate()
  const [comment, setComment] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

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
      navigagte('/')
    },
  })

  const createCommentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  const handleVote = async () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
    notificationFn(`You liked ${blog.title} by ${blog.author}`)
  }

  const handleDelete = async () => {
    deleteBlogMutation.mutate(blog.id)
    notificationFn(`Blog ${blog.title}, by ${blog.author} removed`)
  }

  const handleComment = async () => {
    createCommentMutation.mutate({ id: blog.id, comment })
    setComment('')
  }

  return (
    <>
      <Card elevation={2} sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
        <CardContent>
          {/* Title and Author */}
          <Typography variant='h4' component='h1' gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            by {blog.author}
          </Typography>

          {/* URL */}
          <Box sx={{ mb: 2 }}>
            <Link
              href={blog.url}
              target='_blank'
              rel='noopener noreferrer'
              color='primary'
              underline='hover'
            >
              {blog.url}
            </Link>
          </Box>

          {/* Likes and Added By */}
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 2 }}>
            <Chip
              icon={<Favorite />}
              label={`${blog.likes} likes`}
              color='primary'
              variant='outlined'
            />
            <Chip
              icon={<Person />}
              label={`added by ${nameOfUser}`}
              variant='outlined'
            />
          </Stack>
        </CardContent>

        <CardActions>
          <Button
            variant='contained'
            startIcon={
              likeBlogMutation.isPending ? <Favorite /> : <FavoriteBorder />
            }
            onClick={handleVote}
            disabled={likeBlogMutation.isPending}
            color='primary'
          >
            {likeBlogMutation.isPending ? 'Liking...' : 'Like'}
          </Button>

          {canRemove && (
            <Button
              variant='outlined'
              startIcon={<Delete />}
              onClick={() => setDeleteDialogOpen(true)}
              color='error'
              disabled={deleteBlogMutation.isPending}
            >
              Remove
            </Button>
          )}
        </CardActions>

        {/* Comments Section */}
        <CardContent>
          <Typography variant='h5' gutterBottom>
            Comments
          </Typography>

          {/* Add Comment */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={createCommentMutation.isPending}
              size='small'
            />
            <Button
              variant='contained'
              startIcon={<Add />}
              onClick={handleComment}
              disabled={createCommentMutation.isPending || !comment.trim()}
              sx={{ minWidth: 'auto' }}
            >
              Add
            </Button>
          </Box>

          {/* Comments List */}
          {blog.comments && blog.comments.length > 0 ? (
            <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
              {blog.comments.map((c, index) => (
                <ListItem
                  key={index}
                  divider={index < blog.comments.length - 1}
                >
                  <ListItemText primary={c} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontStyle: 'italic' }}
            >
              No comments yet. Be the first to comment!
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby='delete-dialog-title'
      >
        <DialogTitle id='delete-dialog-title'>Remove Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove &quot;{blog.title}&quot; by{' '}
            {blog.author}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color='error'
            variant='contained'
            disabled={deleteBlogMutation.isPending}
          >
            {deleteBlogMutation.isPending ? 'Removing...' : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
}

export default Blog
