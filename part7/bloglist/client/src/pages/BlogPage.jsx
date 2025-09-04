import { useParams } from 'react-router-dom'
import Blog from '../components/Blog'

const BlogPage = ({ blogs, notificationFn }) => {
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === id)
  return <Blog blog={blog} notificationFn={notificationFn} />
}

export default BlogPage
