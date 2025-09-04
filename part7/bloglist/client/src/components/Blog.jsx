import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import storage from '../services/storage'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, notificationFn }) => {
  const queryClient = useQueryClient()
  const navigagte = useNavigate()

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

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  const handleVote = async (blog) => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
    notificationFn(`You liked ${blog.title} by ${blog.author}`)
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
      notificationFn(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => handleVote(blog)}>like</button>
      </div>
      <div>added by {nameOfUser}</div>
      {canRemove && <button onClick={() => handleDelete(blog)}>remove</button>}
    </div>
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
