import { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog">
      {blog.title}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>View</button>
      {showDetails && (
        <>
          <a>{blog.url}</a>
          <p>
            {blog.likes} likes <button onClick={handleLike}>Like!</button>
          </p>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
