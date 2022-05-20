import React, { FC, useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Typography, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { authSelector } from "@redux/slices/auth";
import { useAppSelector } from "@redux/hooks";
import {
  SettingOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import styles from "./Sider.module.scss";
import { ALL_TIMESHEETS_PAGE, CURRENT_TIMESHEETS_PAGE } from "@helpers/routes";

interface SiderProps {
  children: JSX.Element;
}

type MenuItem = Required<MenuProps>["items"][number];

const Sider: FC<SiderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth, role } = useAppSelector(authSelector);
  const [collapsed, setCollapsed] = useState(true);

  const getItem = (
    visible: boolean,
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    if (visible) {
      return {
        key,
        icon,
        children,
        label,
        type,
      } as MenuItem;
    }
    return null;
  };

  const items: MenuItem[] = [
    getItem(true, "Current", CURRENT_TIMESHEETS_PAGE, <FileTextOutlined />),
    getItem(
      true,
      "All Timesheets",
      ALL_TIMESHEETS_PAGE,
      <FolderOpenOutlined />
    ),

    getItem(role === "PMO", "Resources", "sub1", <SettingOutlined />, [
      getItem(true, "Act as Delegate", "4"),
      getItem(true, "Edit Resource", "5"),
      getItem(true, "Add Resource", "6"),
    ]),

    getItem(
      role === "PMO",
      "Download timesheet report",
      "3",
      <DownloadOutlined />
    ),
  ];

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const goTo = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout>
      {isAuth && (
        <Layout.Sider
          trigger={null}
          collapsedWidth={50}
          onCollapse={() => setCollapsed(!collapsed)}
          collapsible
          collapsed={collapsed}
        >
          <div onClick={toggle} className={styles["sider-button"]}>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </div>
          {!collapsed && (
            <Typography.Title className={styles.title} level={5}>
              MY TIMESHEETS
            </Typography.Title>
          )}
          <Menu
            onClick={goTo}
            defaultSelectedKeys={["1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </Layout.Sider>
      )}
      <Layout.Content className={styles.content}>{children}</Layout.Content>
    </Layout>
  );
};

export default Sider;
