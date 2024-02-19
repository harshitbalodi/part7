import React from 'react'
import { useState } from 'react'

const CreateBlog = ({ setBlog,handleBlog, blog}) => {
    const [createBlogVisible, setCreateBlogVisible] = useState(false);
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }   

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