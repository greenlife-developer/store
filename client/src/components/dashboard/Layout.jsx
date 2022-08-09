import React from "react";
import "antd/dist/antd.min.css";
import { Tabs } from "antd";
import "./dashboard.css";
import Table from "./Table";
import Sales from "./Sales";

const { TabPane } = Tabs;

const Layout = () => {
  let isMobile = false
  if (window.innerWidth <= 425) {
    isMobile = true
  } else {
    isMobile = false
  }

  return (
    <div className="container-fluid dashboard">
      <Tabs tabPosition={isMobile ? "top" : "left"}>
        <TabPane tab="Store" key="1">
          <Table />
        </TabPane>
        <TabPane tab="Sales" key="2">
          <Sales />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Layout;
