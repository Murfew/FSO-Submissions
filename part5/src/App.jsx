import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));

      showSuccess(
        `A new blog '${createdBlog.title}' by ${createdBlog.author} has been added!`
      );

      blogFormRef.current.toggleVisibility();
    } catch (error) {
      showError('Failed to create blog');
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification
          message={successMessage !== null ? successMessage : errorMessage}
          className={successMessage !== null ? 'success' : 'error'}
        />
        <LoginForm setUser={setUser} showError={showError} />
      </div>
    );
  }

  return (
    <div>
      <Notification
        message={successMessage !== null ? successMessage : errorMessage}
        className={successMessage !== null ? 'success' : 'error'}
      />
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
