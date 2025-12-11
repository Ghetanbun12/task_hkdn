import React from "react";
import type { FormProps } from "antd";
import "../../styles/Login/ResetPassword.css";
import { Button, Form, Input } from "antd";

type FieldType = {
  username?: string;
};

interface ResetPasswordProps {
  onContinue: () => void;
  onCancel: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onContinue, onCancel }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = () => {};
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {};

  return (
    <div className="container-form">
      <div className="logo-form">
        <img src="../../../image/alta-logo.png" alt="" className="logo-img" />
      </div>

      <div className="title"><h3>Đặt lại mật khẩu</h3></div>

      <Form
        layout="vertical"
        className="reset-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item<FieldType>
          label="Vui lòng nhập email để đặt lại mật khẩu của bạn *"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item>
          <div className="reset-btn">
          <Button className="cancel-btn" onClick={onCancel}>
            Hủy
          </Button>

          <Button className="continue-btn" onClick={onContinue}>
            Tiếp tục
          </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
