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

after(async () => {
  await mongoose.connection.close();
});
