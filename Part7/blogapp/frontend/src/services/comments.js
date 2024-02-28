import axios from "axios"

const getComments = async (blogId) => {
  const request = await axios.get(`/api/blogs/${blogId}/comments`)
  return request.data
}

export default getComments