import React, { useEffect, useState } from "react";
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

//   const [isLogin, setIsLogin] = useState(null);

  return (
    <>
      <nav className="navigation">
        <div className="nav-content">
          <Navigation />
        </div>
      </nav>
    </>
  );
}
