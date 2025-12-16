import React from 'react';
import { Button, Input, Space, Checkbox, Breadcrumb } from 'antd';
import type { DeviceData } from '../../store/deviceSlice';

interface DeviceFormProps {
  selectedDevice: DeviceData | null;
  onBack: () => void;
  onSubmit?: (data: any) => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({selectedDevice, onBack, onSubmit }) => {
  return (
    <>
      
      <h2 className="page-title">Quản lý dịch vụ</h2>
      
      <div className="form-card">
        <h3 className="section-title">Thông tin dịch vụ</h3>
        
        <div className="form-grid">
          <div>
            <div className="form-label">Mã dịch vụ <span className="required">*</span></div>
            <Input placeholder="201" defaultValue={selectedDevice?.code} />
          </div>
          
          <div>
            <div className="form-label">Mô tả</div>
            <Input.TextArea rows={4} placeholder="Mô tả dịch vụ" defaultValue={selectedDevice?.description} />
          </div>
          
          <div>
            <div className="form-label">Tên dịch vụ <span className="required">*</span></div>
            <Input placeholder="Khám tim mạch" defaultValue={selectedDevice?.name} />
          </div>
        </div>
        
        <h3 className="section-title section-title-spacing">Quy tắc cấp số</h3>
        
        <div className="checkbox-group">
          <Checkbox>
            Tăng tự động từ: 
            <Input className="inline-input" defaultValue="0001" />
            đến
            <Input className="inline-input" defaultValue="9999" />
          </Checkbox>
        </div>
        
        <div className="checkbox-group">
          <Checkbox>
            Prefix:
            <Input className="inline-input-small" defaultValue="0001" />
          </Checkbox>
        </div>
        
        <div className="checkbox-group">
          <Checkbox>
            Surfix:
            <Input className="inline-input-small" defaultValue="0001" />
          </Checkbox>
        </div>
        
        <div className="checkbox-group">
          <Checkbox>Reset mỗi ngày</Checkbox>
        </div>
        
        <div className="required-note">
          * Là trường thông tin bắt buộc
        </div>
        
        <Space className="form-actions">
          <Button onClick={onBack} size="large" className="btn-cancel">
            Hủy bỏ
          </Button>
          <Button type="primary" size="large" className="btn-submit" onClick={onSubmit}>
            {selectedDevice ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Space>
      </div>
    </>
  );
};

export default DeviceForm;