const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('all blog posts have id property and no _id', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      assert.ok(blog.id);
      // eslint-disable-next-line no-underscore-dangle
      assert.strictEqual(blog._id, undefined);
    });
  });

  describe('adding a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Tester',
        url: 'http://example.com',
        likes: 5,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((n) => n.title);
      assert(titles.includes('Test Blog'));
    });

    test('fails with status code 400 if title is invalid', async () => {
      const newBlog = {
        author: 'John Doe',
        url: 'http://test.com',
      };

      await api.post('/api/blogs').send(newBlog).expect(400);
    });

    test('fails with status code 400 if url is invalid', async () => {
      const newBlog = {
        author: 'John Doe',
        title: 'No URL blog',
      };

      await api.post('/api/blogs').send(newBlog).expect(400);
    });

    test('sets likes to 0 if it is missing', async () => {
      const newBlog = {
        title: 'Blog without likes',
        author: 'John Doe',
        url: 'http://test.com',
      };

      const response = await api.post('/api/blogs').send(newBlog);

      assert.strictEqual(response.body.likes, 0);
    });
  });

  describe('deleting a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      const ids = blogsAtEnd.map((blog) => blog.id);
      assert(!ids.includes(blogToDelete.id));

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
