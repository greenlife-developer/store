import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./nav.css";
import { useEffect } from "react";

export default function Navigation() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        if (data !== undefined) {
          setIsLogin(true);
          setUser(data);
        }
      });
  }, []);

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <h4 className="logo">EYOB</h4>
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
                  {isLogin && user.user ? (
                    <div>
                      <li>
                        <Link className="nav-links" to="/api/logout">
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
                          <h6>Logout</h6>
                        </Link>
                      </li>
                    </div>
                  ) : (
                    <div>
                      <li>
                        <NavLink className="nav-links" to="/api/login">
                          <i className="fa-solid fa-arrow-right-to-bracket"></i>
                          <h6 className="btn-primary">Login</h6>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-links" to="/api/register">
                          <i className="fa-solid fa-user-plus"></i>
                          <h6 className="btn-primary">Register</h6>
                        </NavLink>
                      </li>
                    </div>
                  )}
                  <li>
                    <NavLink className="nav-links" to="/api/dashboard">
                      <i className="fa-solid fa-gauge"></i>
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
