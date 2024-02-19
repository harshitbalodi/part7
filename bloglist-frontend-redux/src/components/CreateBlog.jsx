import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogService';
import { useDispatch } from 'react-redux';
import { setErrorMessage,resetErrorMessage,setAddMessage, resetAddmessage } from '../store/NotificationSlice';
import { addBlog } from '../store/blogSlice';

const CreateBlog = () => {
    const dispatch = useDispatch();
    const [createBlogVisible, setCreateBlogVisible] = useState(false);
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }   
    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: ""
    })

    const handleBlog = async (e) => {
        e.preventDefault();
        try {
            const {data}  = await blogService.createBlog(blog);
            console.log(data);
            setBlog({
                title: "",
                author: "",
                url: ""
            })    
            dispatch(addBlog(data));
            dispatch(setAddMessage(`a new blog ${data.title} by ${data.author}`));
            setTimeout(() => dispatch(resetAddmessage()), 5000);
            console.log("new blog added...")
        } catch (error) {
            console.log("error in create blog",error);
            dispatch(setErrorMessage(error.response.data));
            setTimeout(() => dispatch(resetErrorMessage()), 5000);
        }
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button data-testid="create-blog" id='create-blog' onClick={() => setCreateBlogVisible(true)}>create Blog</button>
            </div>
            <div style={showWhenVisible}>
              <h2>create new Blog</h2>
                <form onSubmit={handleBlog}>
                    <div>
                        <input
                            type="text"
                            name="Title"
                            value={blog.title}
                            placeholder="title"
                            id='title'
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="Author"
                            value={blog.author}
                            placeholder='author'
                            id='author'
                            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                        />

                    </div>
                    <div>
                        <input
                            type="text"
                            name="Url"
                            value={blog.url}
                            placeholder='url'
                            id='url'
                            onChange={(e) => setBlog({ ...blog, url: e.target.value })}
                        />

                    </div>
                    <button data-testid='create' id='create' type='submit'> Create</button>

                </form>
                <button  onClick={() => setCreateBlogVisible(false)}>cancel</button>
            </div>

        </div>
    )
}

export default CreateBlog