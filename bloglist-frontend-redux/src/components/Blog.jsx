import blogService from "../services/blogService";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setAddMessage, resetAddmessage, resetErrorMessage } from "../store/NotificationSlice";
import { likeBlog, deleteBlog, addComment } from "../store/blogSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Blog = () => {
  const id = useParams().id;
  const user = useSelector(state => state.user);
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const dispatch = useDispatch();
  
  const [comment, setComment] = useState("");  
  console.log(blog);

  const handleLike = async (id) => {
    try {
      const {data} = await blogService.likeBlog(blog.id);
      console.log(data);
      dispatch(likeBlog(data));
      dispatch(setAddMessage(`you liked ${data.title}`));
      setTimeout(() => dispatch(resetAddmessage()), 5000);
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(error.response.data));
      setTimeout(() => dispatch(resetErrorMessage()), 5000);
    }
  }
  const handleRemove = async () => {
    const action = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (action) {
      try {
        await blogService.deleteBlog(blog.id);
        dispatch(deleteBlog({ id: blog.id }));
        dispatch(setAddMessage(`${blog.title} by ${blog.author} is removed`));
        setTimeout(() => dispatch(resetAddmessage()), 5000);
      } catch (error) {
        console.log(error);
        dispatch(setErrorMessage(error.response.data));
        setTimeout(() => dispatch(resetErrorMessage()), 5000);
      }
    }
  }
  const handleComment = async(e) => {
    console.log("handlecomment")
    e.preventDefault();
    try{
      const {data} = await blogService.createComment(blog.id, comment);
      console.log(data);
      dispatch(addComment(data));
      setComment("");
      console.log("completed without an issue");
    }catch(error){
      console.log(error);
      dispatch(setErrorMessage(error.response.data));
      setTimeout(() => dispatch(resetErrorMessage()), 5000);
    }
    

  }

  return !blog ?
    <div>
      the blog id does not exist
    </div>
    : (
      <div className="blog">
        {
          <div>
            <span data-testid="title">
              {blog?.title},
            </span>
            <span data-testid="author">
              {blog?.author}
            </span>
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

              <form onSubmit={handleComment}>
                < input onChange={(e) => setComment(e.target.value)} placeholder="give your comment" />
                <button type="submit" value={comment} style={{ backgroundColor: "lightblue" }}>💬</button>
              </form>

              <h2>Comments</h2>
              <ul>
                {
                  blog?.comments.length === 0
                    ?
                    <div>No comments,please erase this drought</div>
                    : 
                    blog?.comments.map(comment => {
                      return <li key={uuidv4()}> {comment}</li>
                    })
                }
              </ul>

            </div>
          </div>

        }
      </div>

    )
}

export default Blog