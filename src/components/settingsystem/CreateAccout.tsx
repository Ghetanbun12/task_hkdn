import React from 'react';
import { Button, Input, Select, Space, Breadcrumb } from 'antd';
import "../../styles/device/DeviceForm.css";
import type { DeviceData } from '../../store/deviceSlice';
import { useState } from 'react';
import Password from 'antd/es/input/Password';
interface DeviceFormProps {
  selectedDevice: DeviceData | null;
  onBack: () => void;
  onSubmit?: (data: any) => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ selectedDevice, onBack, onSubmit }) => {
  const [status,setStatus] = useState<any>();
  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onBack} className="breadcrumb-link">
          Danh sách thiết bị
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-active">
          Thêm thiết bị
        </Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="page-title">Quản lý thiết bị</h2>

      <div className="form-card">
        <h3 className="section-title">Thông tin thiết bị</h3>

        <div className="device-form-grid">

          <div className="form-item">
            <div className="form-label">Họ tên <span className="required">*</span></div>
            <Input placeholder="Nhập mã thiết bị" />
          </div>
          <div className="form-item">
            <div className="form-label">Tên đăng nhập <span className="required">*</span></div>
            <Input  placeholder="Nhập họ tên" />
          </div>
          <div className="form-item">
            <div className="form-label">Số điện thoại <span className="required">*</span></div>
            <Input placeholder="Nhập số điện thoại" />
          </div>
          <div className="form-item">
            <div className="form-label">Mật khẩu <span className="required">*</span></div>
            <Input.Password   />
          </div>
          <div className="form-item">
            <div className="form-label">Email<span className="required">*</span></div>
            <Input placeholder="Nhập email" />
          </div>
          <div className="form-item">
            <div className="form-label">Nhập lại mật khẩu <span className="required">*</span></div>
            <Input.Password  />
          </div>
          <div className="form-item">
            <div className="form-label" >Dịch vụ sử dụng <span className="required">*</span></div>
               <Select placeholder = "Chọn vai trò"
        // value={status}
        // onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Kế toán</option>
        <option value="active">Quản lý</option>
        <option value="inactive">Admin</option>
      </Select>
          </div>
          <div className="form-item">
            <div className="form-label" >Tình trạng <span className="required">*</span></div>
             <Select defaultValue="Hoạt động" 
        // value={status}
        // onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Tất cả</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Ngưng hoạt động</option>
      </Select>
          </div>

        </div>

        <div className="required-note">
          <span className="required">*</span> Là trường thông tin bắt buộc
        </div>
      </div>

      <Space className="form-actions-center">
        <Button
          onClick={onBack}
          size="large"
          className="btn-cancel"
        >
          Hủy bỏ
        </Button>
        <Button
          type="primary"
          size="large"
          className="btn-submit"
          onClick={onSubmit}
        >
          Thêm
        </Button>
      </Space>
    </>
  );
};

export default DeviceForm;