import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog">
      {blog.title}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>View</button>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
