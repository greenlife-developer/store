import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import "./nav.css";
import { useEffect } from "react";

export default function Navigation() {
  //   const [isLogin, setIsLogin] = useState(false);
  //   const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data !== undefined) {
  //         setIsLogin(true);
  //         setUser(data);
  //       }
  //     });
  //   }, [])

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src={logo} alt="" />
        </Link>
      </div>
      <div className="btn-group">
        <div
          className="dropdown-toggle dropbtx"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="dropdown-menu dropdown-menu-end">
          <div>
            <div className="users">
              <div className="user-login">
                <div>
                  <li>
                    <NavLink className="nav-links" to="/login">
                      <i class="fa-solid fa-arrow-right-to-bracket"></i>
                      <h6 className="btn-primary">Login</h6>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-links" to="/register">
                      <i class="fa-solid fa-user-plus"></i>
                      <h6 className="btn-primary">Register</h6>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-links" to="/dashboard">
                      <i class="fa-solid fa-gauge"></i>
                      <h6 className="btn-primary">Dashboard</h6>
                    </NavLink>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
