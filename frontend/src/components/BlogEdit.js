import React, { useEffect, useState } from "react";
import "../styles/Edit.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEditBlog, updateBlog } from "../features/blog/blogSlice";
import { useForm } from "react-hook-form";
import uploadImage from "../utils/uploadImage";
export default function BlogEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getEditBlog(id));
  }, [id]);
  const { editBlog } = useSelector((state) => state.blog);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [setImageUrl] = useState(undefined);
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
    dispatch(
      updateBlog({
        id,
        fields,
      })
    ); // sımdı buradan ıd gıdıyorda
    navigate(`/Details/${id}`);
  };

  if (!editBlog) return <>test.</>;
  return (
    <div className="BlogEdit">
      <div className="row">
        <div className="col form-col">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-gorup">
              <h3>Edit Your Blog</h3>
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
            {editBlog?.image && (
              <div className="image-display">
                <img src={editBlog?.image} alt="" />
              </div>
            )}
            <div className="form-gorup">
              <input
                {...register("tag", {
                  required: true,
                })}
                type="text"
                placeholder="Please add a tag"
                defaultValue={editBlog?.tag}
              />
              {errors.tag && <p className="error">Tag is required</p>}
            </div>
            <div className="form-gorup">
              <input
                type="text"
                placeholder="Please add a title"
                defaultValue={editBlog?.title}
                {...register("title", {
                  required: true,
                })}
              />
              {errors.title && <p className="error">Title is required</p>}
            </div>
            <div className="form-gorup">
              <textarea
                rows="10"
                cols="35"
                type="text"
                placeholder="Please add a desc"
                defaultValue={editBlog?.desc}
                {...register("desc", {
                  required: true,
                })}
              />
              {errors.desc && <p className="error">Description is required</p>}
            </div>
            <div className="form-gorup">
              <button type="submit" disabled={isImageUploading}>
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
