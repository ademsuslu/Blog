import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

// import Login from "./pages/Login";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import "./styles/App.css";
import Register from "./pages/Register";
import Header from "./components/Header";
import CreateBlog from "./pages/CreateBlog";
import { useSelector } from "react-redux";
import Details from "./pages/Details";
import BlogEdit from "./components/BlogEdit";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <div className="navbardiv">
          <h3>Welcome {user && user.name}</h3>
          <Header />
        </div>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/BlogEdit/:id" element={<BlogEdit />} />
          <Route path="/Details/:id" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
