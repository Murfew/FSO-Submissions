import { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='blog'>
      {blog.title} {!showDetails && blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'}
      </button>
      {showDetails && (
        <>
          <p>
            <a href={blog.url}>{blog.url}</a>
          </p>
          <p>
            {blog.likes} likes <button onClick={handleLike}>Like!</button>
          </p>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button onClick={handleRemove}>Remove</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
