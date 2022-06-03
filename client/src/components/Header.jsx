import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../stylesheets/Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  // Changing tab depending on active tab
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddPost");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);
  return (
    <div className="header">
      <p className="logo">Facebook</p>
      <div className="header-right">
        <Link to="/">
          <p className={`${activeTab === "Home" ? "active " : ""} `}>Home</p>
        </Link>
        <Link to="/add">
          <p className={`${activeTab === "AddPost" ? "active " : ""} `}>
            Add Post
          </p>
        </Link>
        <Link to="/about">
          <p className={`${activeTab === "About" ? "active " : ""} `}>About</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
