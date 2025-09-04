import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import storage from '../services/storage'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blog, notificationFn }) => {
  const queryClient = useQueryClient()
  const navigagte = useNavigate()
  const [comment, setComment] = useState('')

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

  const handleComment = async () => {
    createCommentMutation.mutate({ id: blog.id, comment })
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
      <div>
        <h3>comments</h3>
        <div>
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={() => handleComment()}>add comment</button>
        </div>
        <ul>
          {blog.comments.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      </div>
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
