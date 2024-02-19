import { useSelector } from 'react-redux';
import CreateBlog from './CreateBlog';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const navigate = useNavigate();
    const blogs = useSelector(state => state.blogs)
    const style = {
        padding: "5px",
        margin: "10px",
        borderWidth: "2px",
        borderColor: "black",
        borderStyle: "solid",
        backgroundColor: 'rgba(0, 128, 128, 0.1)',
    }
    const handleClick = (id)=>{
        navigate(`/blogs/${id}`);
    }
    return (
        <div>
            <CreateBlog />
            {
                blogs.map(blog =>
                    <div style={style} key={blog.id} onClick={()=>handleClick(blog.id)}>
                        {blog.title}
                    </div>
                )
            }
        </div>
    )
}

export default Blogs