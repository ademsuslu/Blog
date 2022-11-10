import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  return (
    <>
      <div className="nav">
        {user ? (
          <>
            <Link to="/Blog">Blog</Link>
            <Link to="/CreateBlog">Create Blog</Link>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/Login");
              }}
              className="button"
            >
              <FiLogOut />
            </button>
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </>
        )}
      </div>
    </>
  );
}
