import React, { useEffect } from "react";
import Img from "../images/Image.svg";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (fields) => {
    if (fields.password !== fields.password2) {
      alert("Password do not match");
    } else {
      dispatch(registerUser(fields));
    }
  };
  useEffect(() => {
    isError && alert(message);
    isSuccess && user && navigate("/Blog");
    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);
  return (
    <div className="container">
      <div className="row">
        <div className="col img-col">
          <img src={Img} alt="" />
        </div>
        <div className="col form-col">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-gorup">
              <h3>Hesabına Giriş Yap</h3>
            </div>
            <div className="form-gorup">
              <input
                {...register("name", { required: true })}
                name="name"
                type="text"
                placeholder="Name"
              />
              {errors.name && <p className="error">Name is required</p>}
            </div>
            <div className="form-gorup">
              <input
                {...register("email", { required: true })}
                name="email"
                type="email"
                placeholder="E-Posta"
              />
              {errors.email && <p className="error">Email is required</p>}
            </div>
            <div className="form-gorup">
              <input
                {...register("password", {
                  required: true,
                })}
                name="password"
                type="password"
                placeholder="Şifre"
              />
              {errors.password && <p className="error">Password is required</p>}
            </div>
            <div className="form-gorup">
              <input
                {...register("password2", {
                  required: true,
                })}
                name="password2"
                type="password"
                placeholder="Confirm Password"
              />
              {errors.password2 && <p className="error">Confirm password</p>}
              {errors.password2 && <p>{errors.password2.message}</p>}
            </div>
            <div className="form-gorup">
              <button type="submit">Giriş Yap</button>
            </div>
            <div className="form-gorup">
              <Link to="/Login">Zaten Bir Hesabın varmı?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
