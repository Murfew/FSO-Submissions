import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      showError('Wrong username or password!');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const createBlog = (event) => {
    event.preventDefault();

    const newBlog = { title, author, url };
    blogService.create(newBlog);
    setBlogs(blogs.concat(newBlog));

    showSuccess(`A new blog \'${title}\' by ${author} has been added!`);

    setAuthor('');
    setTitle('');
    setUrl('');
  };

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification
          message={successMessage !== null ? successMessage : errorMessage}
          className={successMessage !== null ? 'success' : 'error'}
        />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Add Blog</h2>
      <Notification
        message={successMessage !== null ? successMessage : errorMessage}
        className={successMessage !== null ? 'success' : 'error'}
      />
      <BlogForm
        author={author}
        setAuthor={setAuthor}
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
        createBlog={createBlog}
      />

      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
