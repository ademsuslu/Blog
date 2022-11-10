import React, { useEffect, useState } from "react";
import "../styles/CreateBlog.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../features/blog/blogSlice";
import { useForm } from "react-hook-form";
import Videos from "../images/Blog.mp4";
import uploadImage from "../utils/uploadImage";
export default function CreateBlog() {
  const { blogs, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.blog
  );
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImage = async (e) => {
    setIsImageUploading(true);
    const result = await uploadImage(e.target.files);
    setValue("image", result[0]);
    setImageUrl(result[0]);
    setIsImageUploading(false);
  };
  const onSubmit = (fields) => {
    dispatch(createBlog(fields));
    reset();
  };
  useEffect(() => {
    // isError && alert(message);
    isSuccess && blogs && navigate("/Blog");
    // dispatch(reset());
  }, [isError, isSuccess, isLoading, message, navigate, dispatch]);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <video autoPlay controls loop src={Videos} />
        </div>
        <div className="col form-col">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-gorup">
              <h3>Create Your Blog</h3>
            </div>
            <div className="form-gorup">
              <input
                hidden
                onChange={handleImage}
                type="file"
                id="actual-btn"
                disabled={isImageUploading}
              />
              <label htmlFor="actual-btn">
                {isImageUploading ? "Uploading..." : "Choose Image"}
              </label>
            </div>
            {imageUrl && (
              <div className="image-display">
                <img src={imageUrl} alt="" />
              </div>
            )}
            <div className="form-gorup">
              <input
                {...register("tag", {
                  required: true,
                })}
                type="text"
                placeholder="Please add a tag"
              />
              {errors.tag && <p className="error">Tag is required</p>}
            </div>
            <div className="form-gorup">
              <input
                {...register("title", {
                  required: true,
                })}
                type="text"
                placeholder="Please add a title"
              />
              {errors.title && <p className="error">Title is required</p>}
            </div>
            <div className="form-gorup">
              <textarea
                rows="10"
                cols="35"
                {...register("desc", {
                  required: true,
                })}
                type="text"
                placeholder="Please add a desc"
              />
              {errors.desc && <p className="error">Description is required</p>}
            </div>
            <div className="form-gorup">
              <button type="submit" disabled={isImageUploading}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
