import React from 'react';
import { Button, Input, Select, Space, Breadcrumb } from 'antd';
import "../../styles/device/DeviceForm.css";
import type { DeviceData } from '../../store/deviceSlice';
interface DeviceFormProps {
  selectedDevice: DeviceData | null;
  onBack: () => void;
  onSubmit?: (data: any) => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ selectedDevice, onBack, onSubmit }) => {
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
    <div className="form-label">Mã thiết bị <span className="required">*</span></div>
    <Input placeholder="Nhập mã thiết bị" />
  </div>

  <div className="form-item">
    <div className="form-label">Loại thiết bị <span className="required">*</span></div>
    <Select className="form-select" />
  </div>

  <div className="form-item">
    <div className="form-label">Tên thiết bị <span className="required">*</span></div>
    <Input />
  </div>

  <div className="form-item">
    <div className="form-label">Loại thiết bị <span className="required">*</span></div>
    <Input />
  </div>

  <div className="form-item">
    <div className="form-label">Địa chỉ IP<span className="required">*</span></div>
    <Input />
  </div>

  <div className="form-item">
    <div className="form-label">Mật khẩu <span className="required">*</span></div>
    <Input.Password />
  </div>

  {/* FULL ROW */}
  <div className="form-item form-item-full">
    <div className="form-label" >Dịch vụ sử dụng <span className="required">*</span></div>
    <Input  />
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
          Thêm thiết bị
        </Button>
      </Space>
    </>
  );
};

export default DeviceForm;