const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel.js");
const User = require("../models/userModel.js");

//@Desc   Get Blog detail
//@Route  Get /api/blogs/:id
//@access Private
const getDetailBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

//@Desc   Get Blogs
//@Route  Get /api/blogs
//@access Private
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ user: req.user.id });

  res.status(200).json(blogs);
});
//@Desc   Create Blogs
//@Route  Post /api/blogs
//@access Private
const postBlogs = asyncHandler(async (req, res) => {
  if (!req.body.desc) {
    res.status(400);
    throw new Error("Please add a description");
  }
  const blog = await Blog.create({
    desc: req.body.desc,
    title: req.body.title,
    tag: req.body.tag,
    image: req.body.image,
    user: req.user.id, // ne için burada ?
  });
  res.status(201).json(blog);
});

//@Desc   Update Blog
//@Route  Put /api/blogs/:id
//@access Private
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  // make sure the logged in user matches the goal user
  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBlog);
});

//@Desc   Delete Blog
//@Route  Delete /api/blogs/:id
//@access Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  // make sure the logged in user matches the goal user
  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  await blog.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBlogs,
  postBlogs,
  updateBlog,
  deleteBlog,
  getDetailBlog,
};
