import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Home/Navigation";
import "./register.css";

export default function Signup() {

  return (
    <div className="registration">
      <Navigation />
      <div className="eversion-container">
        <div className="container-form">
          <div className="forms">
            <div className="sign-up">
              <h2>Let's Sign you up</h2>
              <h6>
                Already created an account? <Link to="/api/login">Login</Link>
              </h6>
            </div>
            <form action="/api/register" method="post">
              <div className="form">
                <div className="form-name">
                  <div>
                    <label htmlFor="f-name">First Name</label>
                    <input type="text" name="fName" />
                  </div>
                  <div>
                    <label htmlFor="l-name">Last Name</label>
                    <input type="text" name="lName" />
                  </div>
                </div>
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
                    <label htmlFor="number">Number</label>
                    <input type="number" name="number" />
                  </div>
                  <div>
                    <input type="submit" className="btn btn-primary" value="Sign Up" />
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
