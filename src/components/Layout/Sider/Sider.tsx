import React, { FC, useState } from "react";
import { Layout, Typography, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import cn from "classnames";
import { authSelector } from "@redux/slices/auth";
import { useAppSelector } from "@redux/hooks";
import styles from "./Sider.module.scss";
import { ALL_TIMESHEETS_PAGE, CURRENT_TIMESHEETS_PAGE } from "@helpers/routes";

interface SiderProps {
  children: JSX.Element;
}

const Sider: FC<SiderProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(authSelector);
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const goTo = (path: string) => {
    navigate(path);
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
          <div className={styles.block}>
            {!collapsed && (
              <Typography.Title className={styles.title} level={5}>
                MY TIMESHEETS
              </Typography.Title>
            )}
            <Button
              type="link"
              disabled={collapsed}
              onClick={() => goTo(CURRENT_TIMESHEETS_PAGE)}
              className={cn({
                [styles.hidden]: collapsed && pathname === ALL_TIMESHEETS_PAGE,
                [styles.rotate]: collapsed,
                [styles.button]: true,
              })}
            >
              Current
            </Button>
            <Button
              type="link"
              onClick={() => goTo(ALL_TIMESHEETS_PAGE)}
              className={cn({
                [styles.hidden]:
                  collapsed && pathname === CURRENT_TIMESHEETS_PAGE,
                [styles.rotate]: collapsed,
                [styles.button]: true,
              })}
            >
              All Timesheets
            </Button>
          </div>
        </Layout.Sider>
      )}
      <Layout.Content className={styles.content}>{children}</Layout.Content>
    </Layout>
  );
};

export default Sider;
