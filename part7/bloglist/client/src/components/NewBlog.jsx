import { useState } from 'react'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'

const NewBlog = ({ doCreate }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    doCreate({ title, url, author })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        mt: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 500, width: '100%' }}
        component='form'
        onSubmit={handleSubmit}
      >
        <Typography variant='h6' gutterBottom>
          Create a New Blog
        </Typography>

        <TextField
          fullWidth
          label='Title'
          variant='outlined'
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label='URL'
          variant='outlined'
          margin='normal'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <TextField
          fullWidth
          label='Author'
          variant='outlined'
          margin='normal'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </Paper>
    </Box>
  )
}

export default NewBlog
