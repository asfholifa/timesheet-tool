import React, { useMemo } from "react";
import { Layout, Typography, Menu, Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { authSelector } from "@redux/slices/auth";
import { useAppSelector } from "@redux/hooks";
import styles from "./Header.module.scss";

const Header = () => {
  const { userName, isAuth, userEmail } = useAppSelector(authSelector);
  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            label: <Typography.Text>{userEmail}</Typography.Text>,
            key: "0",
          },
          {
            label: (
              <Button danger type="link" block>
                Sign Out
              </Button>
            ),
            key: "1",
          },
        ]}
      />
    ),
    [userEmail]
  );

  return (
    <Layout.Header className={styles.header}>
      <Typography.Title>Timesheet</Typography.Title>
      {isAuth && (
        <div className={styles["user-box"]}>
          <Typography.Text>{userName}</Typography.Text>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              onClick={(e) => e.preventDefault()}
              shape="circle"
              size="large"
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      )}
    </Layout.Header>
  );
};

export default Header;
