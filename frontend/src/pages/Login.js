import React, { useEffect, useState } from "react";
import Img from "../images/Image.svg";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
export default function Login() {
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
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (prop) => (e) => {
    setUserData({ ...userData, [prop]: e.target.value });
  };
  const { email, password } = userData;
  const onSubmit = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
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
                {...register("email", { required: true })}
                onChange={handleChange("email")}
                value={userData.email}
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
                onChange={handleChange("password")}
                value={userData.password}
                name="password"
                type="password"
                placeholder="Password"
              />
              {errors.password && <p className="error">Password is required</p>}
            </div>
            <div className="form-gorup">
              <button type="submit">Giriş Yap</button>
            </div>
            <div className="form-gorup">
              <Link to="/Register">Kayıt Ol</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
