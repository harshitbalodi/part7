import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
    const allUsers = useSelector(state=> state.allUsers);
    const id = useParams().id;
    const user = allUsers.find(user=> user.id == id);
    console.log(user);

  return !user ?
  <div>
    user id does not exist
  </div>
  :
  (
    <div>
        <h1>{user.name}</h1>
        <h3>added blogs</h3>
        <ul>
            {
                user.blogs.map(blog => <li key={blog.id}> {blog.title} </li>)
            }
        </ul>
    </div>
  )
}

export default User