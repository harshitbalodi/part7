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
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (blogObj) => {
  const response = await axios.post(baseUrl, blogObj, {
    headers: { Authorization: token },
  });
  const data = response.data;
  console.log(data);
  return data;
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
  try {
    const response = await axios.delete(baseUrl + `/${id}`, {
      headers: { Authorization: token },
    });
    console.log("Deletion:", response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default { getAll, setToken, createBlog, likeBlog, deleteBlog };
