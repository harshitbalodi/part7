import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    intializeBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      const newState = state.filter((blog) => blog.id !== id);
      return newState;
    },
    likeBlog(state, action) {
      const newBlog = action.payload;
      const newState = state.map((blog) =>
        blog.id === newBlog.id ? newBlog : blog
      );
      return newState;
    },
    addBlog(state, action) {
      state.push(action.payload);
      return state;
    },
    addComment(state, action) {
      const newBlog = action.payload;
      const newState = state.map((blog) =>
        blog.id === newBlog.id ? newBlog : blog
      );
      return newState;
    },
  },
});
export const { intializeBlogs, deleteBlog, likeBlog, addBlog, addComment} =
  blogSlice.actions;

export default blogSlice.reducer;
