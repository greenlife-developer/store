import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Home/Navigation";

export default function Login() {
  // const [isLogin, setIsLogin] = useState(false);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("/login")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data !== undefined) {
  //         setIsLogin(true);
  //         setUser(data);
  //       }
  //     });
  // });

  return (
    <div id="login" className="registration login">
      <Navigation />
      <div className="eversion-container">
        <div className="container-form">
          <div className="forms">
            <div className="sign-up">
              <h2>Welcome, please log in</h2>
              <h6>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </h6>
            </div>
            <form action="/login" method="post">
              <div className="form">
                <div className="signup-inputs">
                  <div>
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="email" id="" />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Sign Up"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
