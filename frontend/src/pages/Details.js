import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetailBlog } from "../features/blog/blogSlice";
import "../styles/Details.css";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detay } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getDetailBlog(id));
  }, [id]);
  return (
    <div className="details">
      <div className="containers">
        <div className="cards">
          <img
            src={
              "https://cdn.dribbble.com/users/1312595/screenshots/10815347/media/18081b740307a20060cb1e99db48d48b.png?compress=1&resize=768x576&vertical=top"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-tag">
            <h3 className="card-title">{detay?.tag}</h3>
            <p>{new Date(detay?.createdAt).toLocaleString("tr-TR")}</p>
          </div>
          <div className="card-body">
            <h4 className="card-title">{detay?.title}</h4>
            <p className="card-text">{detay?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
