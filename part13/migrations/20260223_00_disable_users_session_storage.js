import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })

  await queryInterface.createTable('sessions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'disabled')
  await queryInterface.dropTable('sessions')
}
