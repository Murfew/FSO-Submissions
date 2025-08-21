const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blog posts have id property and no _id', async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach((blog) => {
    assert.ok(blog.id);
    // eslint-disable-next-line no-underscore-dangle
    assert.strictEqual(blog._id, undefined);
  });
});

test('a valid blog can be added ', async () => {
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

test('if likes is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'John Doe',
    url: 'http://test.com',
  };

  const response = await api.post('/api/blogs').send(newBlog);

  assert.strictEqual(response.body.likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
