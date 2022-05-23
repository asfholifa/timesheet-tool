import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Typography, Menu } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
  DownloadOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { authSelector } from "@redux/slices/auth";
import { useAppSelector } from "@redux/hooks";
import DownloadTimeSheet from "@components/DownloadTimesheet/DownloadTimeSheet";
import {
  ALL_TIMESHEETS_PAGE,
  CURRENT_TIMESHEETS_PAGE,
  TASKS_CREATION_PAGE,
} from "@helpers/routes";
import styles from "./Sider.module.scss";

interface SiderProps {
  children: JSX.Element;
}

type MenuItem = Required<MenuProps>["items"][number];

const Sider: FC<SiderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth, role } = useAppSelector(authSelector);
  const [collapsed, setCollapsed] = useState(true);
  const [reportModalVisible, setReportModalVisible] = useState(false);

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
      "downloadReport",
      <DownloadOutlined />
    ),

    getItem(
      role === "PMO",
      "Tasks Creation",
      TASKS_CREATION_PAGE,
      <FileAddOutlined />
    ),
  ];

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const goTo = ({ key }: { key: string }) => {
    switch (key) {
      case "downloadReport": {
        setReportModalVisible(true);
        break;
      }
      default: {
        navigate(key);
        break;
      }
    }
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
            defaultSelectedKeys={[CURRENT_TIMESHEETS_PAGE]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </Layout.Sider>
      )}
      <Layout.Content className={styles.content}>{children}</Layout.Content>
      <DownloadTimeSheet
        reportModalVisible={reportModalVisible}
        setReportModalVisible={setReportModalVisible}
      />
    </Layout>
  );
};

export default Sider;
