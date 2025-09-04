import axios from 'axios'
import storage from './storage'

const baseUrl = '/api/blogs'

const getConfig = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
})

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const update = async (newObject) => {
  const request = axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    getConfig()
  )
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const createComment = async ({ id, comment }) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

export default { getAll, create, update, remove, createComment }
