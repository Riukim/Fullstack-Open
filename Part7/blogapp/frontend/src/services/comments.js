import axios from "axios"

const getComments = async (blogId) => {
  const request = await axios.get(`/api/blogs/${blogId}/comments`)
  return request.data
}

const createComment = async (blogId, content) => {
  const request = await axios.post(`/api/blogs/${blogId}/comments`, content)
  return request.data
}

export default { getComments, createComment }