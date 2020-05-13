import Sequelize from 'sequelize';
import { dummy_users } from './dummy-data.js'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

export const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  // options
});

export const initialize_database = async () => {
  await User.sync({ force: true })
  dummy_users.forEach(user => User.create(user))
}

