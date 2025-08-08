const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, cur) => acc + cur.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce((acc, cur) => {
    if (cur.likes > acc.likes) {
      return cur;
    }
    return acc;
  });
};

const mostBlogs = (blogs) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  _.chain(blogs)
    .groupBy('author')
    .map((posts, author) => ({ author, blogs: posts.length }))
    .maxBy('blogs')
    .value();

const mostLikes = (blogs) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  _.chain(blogs)
    .groupBy('author')
    .map((posts, author) => ({
      author,
      likes: _.sumBy(posts, 'likes'),
    }))
    .maxBy('likes')
    .value();

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
