import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Table from "./Table";
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

  const handleChange = (e) => {
    console.log(e.target.value)
  }

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
          <Table />
        </TabPane>
        <TabPane tab="Sales" key="2">
          <h1>Sales Record</h1>
          <div className="store">
            <input type="text" name="query" placeholder="Enter a keyword" onChange={handleChange}  />
            {/* <div className="right">
              <Link to="/api/new-sales" className="btn btn-primary ">
                New sale
              </Link>
            </div> */}
            <div className="sales">
              <Sales />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Layout;
