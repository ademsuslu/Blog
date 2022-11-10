import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./features/auth/authSlice";
import blogReducer from "./features/blog/blogSlice";

export default configureStore({
  reducer: {
    auth: useReducer,
    blog: blogReducer,
  },
});
