import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  blogs: [],
  detay: null,
  editBlog: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
const URL = "http://localhost:5000/api/blogs";
// Create Blog
const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (formData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(URL, formData, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return URL.rejectWithValue(message);
    }
  }
);

// Get Blog
const getBlog = createAsyncThunk("blog/getBlog", async (_, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(URL, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return URL.rejectWithValue(message);
  }
});

// Get details Blog
const getDetailBlog = createAsyncThunk(
  "blog/getDetailBlog",
  async (id, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(URL + "/" + id, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return URL.rejectWithValue(message);
    }
  }
);

// Get Edit Blog
const getEditBlog = createAsyncThunk(
  "blog/getEditBlog",
  async (id, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(URL + "/" + id, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return URL.rejectWithValue(message);
    }
  }
);

// update Blog
const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, fields }, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(URL + "/" + id, fields, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return URL.rejectWithValue(message);
    }
  }
);

// delete Blog
const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(URL + "/" + id, config);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return URL.rejectWithValue(message);
  }
});

// Slice
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      //  Get Blog
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      //  Get Detail Blog
      .addCase(getDetailBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.detay = action.payload;
      })
      .addCase(getDetailBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      //   Delete
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload.id
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //  Get Edit Blog
      .addCase(getEditBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEditBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.editBlog = action.payload;
      })
      .addCase(getEditBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      //   Update
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.map((i) => {
          if (i._id === action.payload._id) {
            return action.payload;
          }
          return i;
        });
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = blogSlice.actions;
export {
  createBlog,
  getEditBlog,
  getBlog,
  deleteBlog,
  getDetailBlog,
  updateBlog,
};
export default blogSlice.reducer;
