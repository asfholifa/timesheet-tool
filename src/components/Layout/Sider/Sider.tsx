import React, { FC, useState } from "react";
import { Layout } from "antd";
import { authSelector } from "@redux/slices/auth";
import { useAppSelector } from "@redux/hooks";

interface SiderProps {
  children: JSX.Element;
}

const Sider: FC<SiderProps> = ({ children }) => {
  const { isAuth } = useAppSelector(authSelector);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout>
      {isAuth && (
        <Layout.Sider
          onCollapse={() => setCollapsed(!collapsed)}
          collapsible
          collapsed={collapsed}
        ></Layout.Sider>
      )}
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default Sider;
