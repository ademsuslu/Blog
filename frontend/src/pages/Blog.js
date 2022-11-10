import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlog } from "../features/blog/blogSlice";
import BlogItem from "../components/BlogItem";
import "../styles/Blog.css";

export default function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { blogs, isError, message } = useSelector((state) => state.blog);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getBlog());
  }, [user, navigate, isError, message, dispatch]);
  console.log(blogs);
  return (
    <>
      <section className="container">
        {blogs.length > 0 ? (
          <div className="blogs">
            {/* <h2>Blog Dashboard</h2> */}
            {blogs.map((item) => {
              return <BlogItem item={item} key={item._id} />;
            })}
          </div>
        ) : (
          <div className="notBlog">
            <h4>you have not set any blogs</h4>
            <Link to="/CreateBlog">Set it</Link>
          </div>
        )}
      </section>
    </>
  );
}
