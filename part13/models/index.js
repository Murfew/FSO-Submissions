import Blog from './blog.js'
import ReadingList from './readingList.js'
import User from './user.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList })
Blog.belongsToMany(User, { through: ReadingList })

export { Blog, ReadingList, User }
