import React, { FC } from "react";
import { Layout as AntLayout } from "antd";
import styles from "./Layout.module.scss";
import Header from "./Header/Header";
import Sider from "./Sider/Sider";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <AntLayout className={styles.layout}>
    <Header />
    <Sider>{children}</Sider>
  </AntLayout>
);

export default Layout;
