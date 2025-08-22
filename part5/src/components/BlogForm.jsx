const BlogForm = ({
  handleSubmit,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => {
  return (
    <>
      <h2>Add Blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title{' '}
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            Author{' '}
            <input type="text" value={author} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            URL <input type="text" value={url} onChange={handleUrlChange} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;
