import axios from "axios"
// for deployment 
const baseUrl ="https://favoriteblogs.onrender.com/api/login"
//for testing
// const baseUrl = 'http://localhost:3003/api/login'

const login = async (obj)=>{
    console.log(obj);
    try{
    const response= await axios.post(baseUrl, obj);
    return response.data;
    }catch(error){
        console.error("error inside loginservice.jsx",error.message);
        throw error;
    }
}

export default {login};
