import { useState } from 'react';
import loginService from '../services/loginService';
import blogService from '../services/blogService';
import ErrorNotitfication from './ErrorNotification';
import { setErrorMessage, resetErrorMessage } from '../store/NotificationSlice';
import { useDispatch } from 'react-redux';
import { saveUser } from '../store/userSlice';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const data = await loginService.login({ username: username, password: password });
          blogService.setToken(data.token);
          localStorage.setItem('userLoggedIn', JSON.stringify(data));
          dispatch(saveUser(data));
          setUsername("");
          setPassword("");
        } catch (error){
          console.log("Login Error:", error);
          if(error?.response?.data){
            dispatch(setErrorMessage(error?.response?.data));
          }else{
            dispatch(setErrorMessage(error?.message));
          }
          setTimeout(() => dispatch(resetErrorMessage()), 5000);
        }
      }
    return (
        <div className='m-16 text-white	 border-solid border-3 rounded-3xl p-4 border-x-slate-900 bg-teal-500 max-h-fit overflow-auto grid'>
            <ErrorNotitfication/>
            <div className='text-2xl font-bold font-serif flex justify-center'>
              Login to application
            </div>
            <form onSubmit={handleLogin}>
                <div className='flex justify-center items-center'>
                    <span className='text-xl'>Username</span>
                    <input
                        className='p-3 text-black m-2 rounded-lg max-w-min'
                        type="text"
                        name="Username"
                        value={username}
                        placeholder='username'
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='flex justify-center items-center'>
                     <span className='text-xl'>Password</span>
                    <input
                        className='p-3 text-black m-2 rounded-lg max-w-min'
                        type="password"
                        name="Password"
                        value={password}
                        placeholder='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex justify-center items-center'>
                <button  className='text-xl rounded-2xl font-bold bg-red-300 px-6 py-3' type="submit" id='login'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm