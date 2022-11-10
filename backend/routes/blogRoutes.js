const express = require("express");
const {
  getBlogs,
  postBlogs,
  updateBlog,
  deleteBlog,
  getDetailBlog,
} = require("../controller/blogController.js");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware.js");

router.route("/").get(protect, getBlogs).post(protect, postBlogs);
router
  .route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog)
  .get(getDetailBlog);

module.exports = router;
