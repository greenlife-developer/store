import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import "./dashboard.css";
import Tables from "./Table";

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
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
  });

  return (
    <div className="container-fluid dashboard">
      <Tabs tabPosition={isMobile ? "top" : "left"}>
        <TabPane tab="Store" key="1">
          <h4>What goods do we have in the store</h4>
          <div className="store">
            <Tables />
          </div>
        </TabPane>
        <TabPane tab="Sales" key="2">
          <h4>What have we sold today?</h4>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Layout;