import React from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import styles from "./Auth.module.scss";
import { useAppDispatch } from "@redux/hooks";
import { setAuth } from "@redux/slices/auth";

const { Title } = Typography;

const Auth = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(
      setAuth({
        userEmail: "mail@mail.com",
        userName: "Глеб Сухоруков",
        isAuth: true,
        role: "User",
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      className={styles.form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item>
        <Title level={3} className={styles.title}>
          Timesheet
        </Title>
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Auth;
