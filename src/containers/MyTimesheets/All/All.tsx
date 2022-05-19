import React from "react";
import { Typography } from "antd";
import { pageTitles } from "@helpers/const";
import { useLocation } from "react-router-dom";

const All = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Typography.Title level={5}>{pageTitles[pathname]}</Typography.Title>
    </>
  );
};

export default All;
