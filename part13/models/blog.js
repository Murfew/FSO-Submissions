import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../util/db.js'

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => new Date().getFullYear(),
      validate: {
        min: 1991,
        maxCurrentYear(value) {
          const currentYear = new Date().getFullYear()
          if (value > currentYear) {
            throw new Error(`year must be <= ${currentYear}`)
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  },
)

export default Blog
