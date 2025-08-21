const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
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
