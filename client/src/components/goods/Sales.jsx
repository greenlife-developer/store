import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Home/Navigation";

export default function Sales() {
  return (
    <div className="registration add">
      <Navigation />
      <div className="eversion-container">
        <div className="container-form">
          <div className="forms">
            <div className="sign-up">
              <h2>Record new Sales</h2>
              <h6>
                Go to <Link to="/api/dashboard">store</Link>
              </h6>
            </div>
            <form action="/new-product" method="post">
              <div className="form">
                <div className="signup-inputs">
                  <div>
                    <label htmlFor="product-name">Product Name</label>
                    <select
                      className="sow"
                      name="product-name"
                    >
                      <option value="Adeola">Adeola</option>
                      <option value="Adeola">Adeola</option>
                      <option value="Adeola">Adeola</option>
                      <option value="Adeola">Adeola</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="price">price</label>
                    <input type="number" name="price" />
                  </div>
                  <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Record new sale"
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
