import axios from "axios";
const baseUrl = "https://favoriteblogs.onrender.com/api/users";
const getall = async()=>{
    const response = await axios.get(baseUrl);
    return response;
}
export default {getall};
