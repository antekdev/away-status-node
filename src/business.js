import { User } from './database.js'
import {
  STATUS_AWAY,
  STATUS_CHECK_INTERVAL_TIME_MS,
  STATUS_ONLINE,
  STATUS_ONLINE_TIMEOUT_MS
} from './constants.js'

export const getAllUsers = async () => await User.findAll()

export const addNewUser = async (user) => {
  // TODO: validation checks

  const new_user = await User.create({ 
    ...user,
    status: STATUS_ONLINE
  })

  return new_user.id
}

export const getUser = async (id) => {
  const user = await User.findOne({
    where: { id }
  })

  return user
}

export const updateUserStatus = async (id, status) => {
  const user = await getUser(id)
  await User.update(
    { status },
    { where: { id } }
  ); 

  return { id, status, old_status: user.status }
}

export const initialize_status_check_interval = () => {
  setInterval(async () => {
    const onlineUsers = await User.findAll({
      attributes: ['id', 'updatedAt'],
      where: {
        status: STATUS_ONLINE
      }
    })
    const now = new Date()
    const awayUsers = onlineUsers.filter(user => {
      const updatedAt = new Date(user.dataValues.updatedAt)
      return now - updatedAt > STATUS_ONLINE_TIMEOUT_MS
    })
    if (awayUsers.length) {
      awayUsers.forEach(user => {
        updateUserStatus(user.dataValues.id, STATUS_AWAY)
      })
    }
    
  }, STATUS_CHECK_INTERVAL_TIME_MS)
}


export default {
  addNewUser,
  getAllUsers,
  getUser,
  initialize_status_check_interval,
  updateUserStatus,
}