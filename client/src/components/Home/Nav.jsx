import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import "./nav.css";
import Navigation from "./Navigation";

export default function Nav() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <nav className="navigation">
        <div className="nav-content">
          <Navigation />
          <div className="store-home">
            <div className="container home">
              <div className="heading">
                <div>
                  <h1>Welcome to EYOB</h1>
                  <h6>Agrochemicals and farm tools</h6>
                </div>
              </div>
              <div className="items-container">
                <div className="items">
                  <div className="item"><h6>Herbicides</h6></div>
                  <div className="item"><h6>Insecticides</h6></div>
                  <div className="item"><h6>Pesticides</h6></div>
                  <div className="item"><h6>Fungicides</h6></div>
                  <div className="item"><h6>Seedlings</h6></div>
                  <div className="item last-child"><Link to="/api/dashboard"><h6>go to store</h6></Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
