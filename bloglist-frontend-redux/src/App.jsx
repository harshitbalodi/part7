import { useEffect } from 'react'
import blogService from './services/blogService'
import AddNotification from './components/AddNotification'
import ErrorNotitfication from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { intializeBlogs } from './store/blogSlice'
import { eraseUser, saveUser } from './store/userSlice'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs';
import { SetAllUsers } from './store/allUsersSlice'
import userService from './services/userService'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    const userDetaills = localStorage.getItem('userLoggedIn');
    if (userDetaills) {
      const accesstokenData = JSON.parse(userDetaills);
      dispatch(saveUser(accesstokenData));
      blogService.setToken(accesstokenData.token);
    }
    const setUsers = async () => {
      const { data } = await userService.getall();
      dispatch(SetAllUsers(data));
    }
    setUsers();
  }, [])

  useEffect(() => {
    const onLogin = async () => {
    try{
        if (!user) {
        const {data} = await blogService.getAll()
        console.log(data);
        dispatch(intializeBlogs(data.sort((a, b) => b.likes - a.likes)));
      }
    }catch(error){
      console.log(error);
    }
    }
    onLogin();
  }, [user]);

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout...")
    localStorage.removeItem('userLoggedIn');
    dispatch(eraseUser());
  }

  return (
    <div >
      {
        !user ?
          <LoginForm/>
          :
          (
            <div className='p-4 bg-slate-600'>
              <h2 className='text-3xl text-slate-100 m-4 p-2 bg-slate-500 rounded-xl border-sky-500 border-2 border-solid inline-block'>Blogs</h2>
              <AddNotification/>
              <ErrorNotitfication/>
              <div>
                <span> {user.name} is logged in</span>
              <button onClick={handleLogout}  > Logout </button>
              </div>
              
              <Routes>
                <Route path='/' element={<Blogs/>}/>
                <Route path='/blogs/:id' element={<Blog/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path='/users/:id' element={<User/>}/>
              </Routes>

            </div>)
      }

    </div>
  )
}

export default App