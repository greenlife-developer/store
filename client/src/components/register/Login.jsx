import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Home/Navigation";

export default function Login() {

  return (
    <div id="login" className="registration login">
      <Navigation />
      <div className="eversion-container">
        <div className="container-form">
          <div className="forms">
            <div className="sign-up">
              <h2>Welcome, please log in</h2>
              <h6>
                Don't have an account? <Link to="/api/register">Sign Up</Link>
              </h6>
            </div>
            <form action="/api/login" method="post">
              <div className="form">
                <div className="signup-inputs">
                  <div>
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="email" />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
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
