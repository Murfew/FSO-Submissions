import Blog from './blog.js'
import ReadingList from './readingList.js'
import User from './user.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'saved_blogs' })
Blog.belongsToMany(User, { through: ReadingList })

export { Blog, ReadingList, User }
