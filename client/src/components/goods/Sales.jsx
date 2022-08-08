import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Home/Navigation";

export default function Sales() {

  const location = useLocation();
  const actualLocation = location.pathname.split("/")[3];
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch("/api/edit/"+actualLocation)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.product);
        if (data) {
          setItem(data.product);
        }
      });
  });

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
            <form action={"/api/new-sales/" + actualLocation} method="post">
              <div className="form">
                <div className="signup-inputs">
                  <div>
                    <label htmlFor="product-name">Product Name</label>
                    <input
                      type="text"
                      value={item ? item.productName : ""}
                      name="productName"
                    />
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
