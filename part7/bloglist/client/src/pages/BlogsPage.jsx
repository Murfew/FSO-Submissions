import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'
import blogService from '../services/blogs'

import { useRef } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const BlogsPage = ({ blogs, notificationFn }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: 'black',
  }

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
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.sort(byLikes).map((blog) => (
        <div style={style} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogsPage
