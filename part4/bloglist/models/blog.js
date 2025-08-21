const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: returnedObject._id.toString(),
    title: returnedObject.title,
    author: returnedObject.author,
    url: returnedObject.url,
    likes: returnedObject.likes,
  }),
});

module.exports = mongoose.model('Blog', blogSchema);
