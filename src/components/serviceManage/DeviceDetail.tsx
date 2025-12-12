import React from 'react';
import { Table, Button, Input, Select, DatePicker, Tag, Space, Breadcrumb } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface DeviceData {
  key: number;
  code: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

interface DeviceDetailData {
  key: number;
  stt: string;
  status: 'completed' | 'processing' | 'waiting';
}

interface DeviceDetailProps {
  selectedDevice: DeviceData | null;
  onBack: () => void;
  onEdit: (record: DeviceData) => void;
}

const DeviceDetail: React.FC<DeviceDetailProps> = ({ selectedDevice, onBack, onEdit }) => {
  // Dữ liệu mẫu cho chi tiết dịch vụ
  const DeviceDetailData: DeviceDetailData[] = [
    { key: 1, stt: '2010001', status: 'completed' },
    { key: 2, stt: '2010002', status: 'completed' },
    { key: 3, stt: '2010003', status: 'processing' },
    { key: 4, stt: '2010004', status: 'waiting' },
    { key: 5, stt: '2010005', status: 'completed' },
    { key: 6, stt: '2010006', status: 'processing' },
    { key: 7, stt: '2010007', status: 'waiting' },
    { key: 8, stt: '2010007', status: 'completed' },
  ];

  // Columns cho bảng chi tiết dịch vụ
  const detailColumns: ColumnsType<DeviceDetailData> = [
    {
      title: 'Số thứ tự',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'completed' | 'processing' | 'waiting') => {
        const statusMap = {
          completed: { text: 'Đã hoàn thành', color: 'success' as const },
          processing: { text: 'Đang thực hiện', color: 'processing' as const },
          waiting: { text: 'Vắng', color: 'warning' as const },
        };
        const statusInfo = statusMap[status] || statusMap.waiting;
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
  ];

  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Dịch vụ</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onBack} className="breadcrumb-link">Danh sách dịch vụ</Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-active">Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      
      <h2 className="page-title">Quản lý dịch vụ</h2>
      
      <div className="detail-container">
        <div className="detail-info-card">
          <h3 className="section-title">Thông tin dịch vụ</h3>
          <div className="info-item">
            <strong>Mã dịch vụ:</strong> {selectedDevice?.code || '201'}
          </div>
          <div className="info-item">
            <strong>Tên dịch vụ:</strong> {selectedDevice?.name || 'Khám tim mạch'}
          </div>
          <div className="info-item">
            <strong>Mô tả:</strong> {selectedDevice?.description || 'Chuyên các bệnh lý về tim'}
          </div>
          
          <h3 className="section-title section-title-spacing">Quy tắc cấp số</h3>
          <div className="rule-item">
            <strong>Tăng tự động:</strong>
            <div className="rule-value">0001 đến 9999</div>
          </div>
          <div className="rule-item">
            <strong>Prefix:</strong> 0001
          </div>
          <div className="rule-item">
            <strong>Reset mỗi ngày</strong>
          </div>
          <div className="example-text">
            Ví dụ: 201-2001
          </div>
        </div>
        
        <div className="detail-table-card">
          <Space className="filter-section">
            <Space>
              <div>
                <div className="filter-label">Trạng thái</div>
                <Select defaultValue="all" className="filter-select">
                  <Option value="all">Tất cả</Option>
                  <Option value="completed">Đã hoàn thành</Option>
                  <Option value="processing">Đang thực hiện</Option>
                  <Option value="waiting">Vắng</Option>
                </Select>
              </div>
              
              <div>
                <div className="filter-label">Chọn thời gian</div>
                <RangePicker format="DD/MM/YYYY" />
              </div>
              
              <div>
                <div className="filter-label">Từ khóa</div>
                <Input 
                  placeholder="Nhập từ khóa" 
                  suffix={<SearchOutlined className="search-icon" />}
                  className="filter-input"
                />
              </div>
            </Space>
          </Space>
          
          <Table 
            columns={detailColumns} 
            dataSource={DeviceDetailData}
            pagination={{
              current: 1,
              pageSize: 10,
              total: DeviceDetailData.length,
              showSizeChanger: false,
            }}
          />
        </div>
      </div>
      
      <Button
        type="primary"
        size="large"
        onClick={() => selectedDevice && onEdit(selectedDevice)}
        className="floating-action-button"
      >
        <span className="floating-button-icon">✎</span>
        <span className="floating-button-text">Cập nhật danh sách</span>
      </Button>
    </>
  );
};

export default DeviceDetail;