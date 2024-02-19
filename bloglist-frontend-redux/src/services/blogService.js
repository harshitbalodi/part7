import axios from "axios";
//for deployment
const baseUrl = "https://favoriteblogs.onrender.com/api/blogs";
//for testing
// const baseUrl = 'http://localhost:3003/api/blogs'
let token = null;

const setToken = (newToken) => {
  if (newToken) token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const createBlog = async (blogObj) => {
  const response = await axios.post(baseUrl, blogObj, {
    headers: { Authorization: token },
  });
  return response;
};

const likeBlog = async (id) => {
  const response = await axios.put(
    baseUrl + `/${id}`,
    { likes: 5 },
    { headers: { Authorization: token } }
  );
  console.log(response.data);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(baseUrl + `/${id}`, {
    headers: { Authorization: token },
  });
};

const getComments = async (id) => {
  const response = await axios.get(baseUrl + `/${id}/comments` );
  return response;
};

const createComment = async (id, comment) => {
  const response = await axios.post(
    baseUrl + `/${id}/comments` ,
    { comment },
    { headers: { Authorization: token } }
  );
  console.log(response.data);
  return response;
};


export default {
  getAll,
  setToken,
  createBlog,
  likeBlog,
  deleteBlog,
  getComments,
  createComment,
};
