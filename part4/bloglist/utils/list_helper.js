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

module.exports = { dummy, totalLikes, favoriteBlog };
