import React from "react";
import type { FormProps } from "antd";
import { Form, Input, Button } from "antd";
import "../../styles/Login/loginConfirmPassword.css";

interface ConfirmPasswordProps {
  onDone: () => void;
}

type FieldType = {
  password?: string;
  confirmPassword?: string;
};

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({ onDone }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = () => {};
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {};

  return (
    <div className="container-form">
      <div className="logo-form">
        <img src="../../../image/alta-logo.png" alt="" className="logo-img" />
      </div>

      <Form
        layout="vertical"
        className="confirm-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Mật khẩu *"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Nhập lại mật khẩu *"
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className="confirm-btn">
          <Button type="primary" className="login-btn" onClick={onDone}>
            Xác nhận
          </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConfirmPassword;
