import React from "react";
import type { FormProps } from "antd";
import "../../styles/Login/LoginForm.css";
import { Form, Input, Button } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface LoginFormProps {
  onForgot: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgot }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = () => {};
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {};

  return (
    <div className="container-form">
      <div className="logo-form">
        <img src="../../../image/alta-logo.png" alt="" className="logo-img" />
      </div>
      <div className="login-form">
      <Form
        layout="vertical"
        className="login-form2"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên đăng nhập *"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu *"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <div className="forgot-password" onClick={onForgot}>
          Quên mật khẩu?
        </div>
        
        <Form.Item>
          <div className="login-form-btn">
          <Button type="primary" htmlType="submit" className="login-btn">
            Đăng nhập
          </Button>
          </div>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default LoginForm;
