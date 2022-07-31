import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Tables from "./Table";
import Sales from "./Sales";

const { TabPane } = Tabs;

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth <= 425) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    // window.addEventListener("resize", handleResize);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return (
    <div className="container-fluid dashboard">
      <Tabs tabPosition={isMobile ? "top" : "left"}>
        <TabPane tab="Store" key="1">
          <h1>All goods in shop</h1>
          <div className="store">
            <div className="left">
              <Link to="/new-product" className="btn btn-primary right">
                Add product
              </Link>
            </div>
            <Tables />
          </div>
        </TabPane>
        <TabPane tab="Sales" key="2">
          <h1>Sales Record</h1>
          <div className="store">
            <div className="left">
              <Link to="/new-sales" className="btn btn-primary right">
                New sale
              </Link>
            </div>
            <Sales />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Layout;
