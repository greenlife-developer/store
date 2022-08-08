import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Home/Navigation";

export default function Add() {
  const location = useLocation();
  const actualLocation = location.pathname.split("/")[3];
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/edit/${actualLocation}`)
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
              <h2>Update this document</h2>
              <h6>
                Go to my <Link to="/api/dashboard">store</Link>
              </h6>
            </div>
            <form action={"/api/edit/" + actualLocation} method="post">
              <div className="form">
                <div className="signup-inputs">
                  <div>
                    <label htmlFor="product-name">Product Name</label>
                    <input
                      type="text"
                      defaultValue={item ? item.productName : ""}
                      name="productName"
                    />
                  </div>
                  <div>
                    <label htmlFor="price">price</label>
                    <input type="number" defaultValue={item ? item.price : ""} name="price" />
                  </div>
                  <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" defaultValue={item ? item.quantity : ""} name="quantity" />
                  </div>
                  <div> 
                    <input
                      type="submit"
                      value="Add new product"
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
