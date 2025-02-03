import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../components/helpers/LoginContext.jsx";
import "../styles/Header.css";

const Header = () => {
  const { isLogin, logout } = useContext(LoginContext); //  Get login state from context
  const navigate = useNavigate();
  console.log(useContext(LoginContext));

  const links = isLogin
    ? ["Home", "About", "Logout", "Upload", "Data"]
    : ["Home", "About", "Login", "Signin"];

  const handleLogout = () => {
    logout();
    navigate("/login"); // ✅ Redirect to login after logout
  };

  return (
    <header className="home-header">
      <div className="home-nav">
        {links.map((link, index) => {
          return link === "Logout" ? (
            <Link key={index} to="/login" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link key={index} to={link === "Home" ? "/" : `/${link}`}>
              {link}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
