import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    const users = useSelector(state => state.allUsers);
    const handleClick = (id) =>{
        navigate(`./${id}`);
    }
    return (
        <table>
            <tbody>
                <tr>
                    <th><h3>Users</h3></th>
                    <th><h3>blogs created</h3></th>
                </tr>
                {
                    users.map(user => {
                        return (
                            <tr key={user.id} onClick={()=>handleClick(user.id)}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Users