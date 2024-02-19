import { useState } from "react"
import blogService from "../services/blogService";
import { useNotificationDispatch } from "./NotificationContextProvider";

const Blog = ({ blog, setErrorMessage, blogs, setBlogs, index, user }) => {
  const [isView, setIsView] = useState(false);
  const NotificationDispatch = useNotificationDispatch();
  console.log(blog)
  const handleLike = async (id) => {
    try {
      const data = await blogService.likeBlog(blog.id);
      const oldblogs = [...blogs];
      oldblogs[index] = data;
      setBlogs(oldblogs);
      NotificationDispatch({ type: "setNotificationMessage", payload: `${blog.title} is liked` });
      setTimeout(() => NotificationDispatch({ type: "resetNotificationMessage" }));
    } catch (error) {
      console.log(error);
      (error.response.data);
      setTimeout(() => NotificationDispatch({ type: "setErrorMessage" }), 5000);
    }
  }

  const handleRemove = async () => {
    const action = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (action) {
      try {
        await blogService.deleteBlog(blog.id);
        const oldblogs = blogs.filter(eachblog => eachblog.id != blog.id)
        setBlogs(oldblogs);
      } catch (error) {
        NotificationDispatch({type:"setErrorMessage",payload:error.response.data});
        setTimeout(() => NotificationDispatch({type:"resetErrorMessage"}), 5000);
      }
    }
  }
  return (
    <div className="blog">
      {
        isView
          ?
          <div>
            <span data-testid="title">
              {blog?.title},
            </span>
            <span data-testid="author">
              {blog?.author}
            </span>
            <button onClick={() => setIsView(!isView)}>hide</button>
            <div>
              <a data-testid="url" href={blog?.url}>{blog?.url}</a>
              <p data-testid="likes">
                {blog?.likes} likes
              </p>
              <button data-testid="like" id="like" onClick={handleLike}> like</button>
              <p data-testid="name"> {blog?.user?.name} </p>
              {user?.username === blog?.user?.username &&
                <button onClick={handleRemove} id="remove">remove</button>
              }
            </div>

          </div>
          :
          <div>
            <span data-testid="title">
              {blog.title},
            </span>
            <span data-testid="author">
              {blog.author}
            </span>
            <button data-testid="view" id="view" onClick={() => setIsView(!isView)}>view</button>
          </div>

      }
    </div>

  )
}

export default Blog