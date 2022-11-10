import React from "react";
import "../styles/BlogItem.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../features/blog/blogSlice";

export default function Blog({ item }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="containers">
        <div className="card">
          <img src={item.image} className="card-img-top" alt="..." />
          <div className="card-tag">
            <h5 className="card-title">{item.tag}</h5>
            <p>{new Date(item.createdAt).toLocaleString("tr-TR")}</p>
          </div>
          <div className="card-body">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-text">
              {item.desc.slice(0, 40)}...
              <Link className="showMore" to={`/Details/${item._id}`}>
                Devamını Oku
              </Link>
            </p>
          </div>
          <div className="actions">
            <button
              type="button"
              onClick={() => dispatch(deleteBlog(item._id))}
            >
              Delete
            </button>
            <Link to={`/BlogEdit/${item._id}`}>Edit</Link>
          </div>
        </div>
      </div>
    </>
  );
}
