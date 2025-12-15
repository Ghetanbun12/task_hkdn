import React, { useEffect } from 'react';
import { Table, Button, Input, Select, DatePicker, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '../../store/hook'; // sửa tên file hooks
import { fetchDevices, DeviceData } from '../../store/deviceSlice';

// export interface DeviceData {
//   key: number;
//   code: string;
//   name: string;
//   ipAddress: string;
//   username: string;
//   password: string;
//   deviceType: string;
//   serviceUsed: string;
//   status: 'active' | 'inactive';
//   description?: string;
//   connectionStatus: 'active' | 'inactive'; 
// }

interface DeviceListProps {
  onViewDetail: (record: DeviceData) => void;
  onEdit: (record: DeviceData) => void;
  onCreateNew: () => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ onViewDetail, onEdit, onCreateNew }) => {
  const dispatch = useAppDispatch();
  // CHỈNH: đọc đúng state key (devices) và dùng tên bé devices
  const { Devices, loading } = useAppSelector((state) => state.devices);

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const listColumns: ColumnsType<DeviceData> = [
    { title: 'Mã Thiết bị', dataIndex: 'code', key: 'code' },
    { title: 'Tên Thiết bị', dataIndex: 'name', key: 'name' },
    { title: 'Địa chỉ IP', dataIndex: 'ipAddress', key: 'ipAddress' },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      key: 'status',
      render: (status: DeviceData['status']) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái Kết nối',
      dataIndex: 'connectionStatus',
      key: 'connectionStatus',
      render: (status: DeviceData['connectionStatus']) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? 'Kết nối' : 'Mất kết nối'}
        </Tag>
      ),
    },
    {key: 'serviceUsed', title: 'Dịch vụ sử dụng', dataIndex: 'serviceUsed'},
    {
      title: '',
      key: 'actions',
      render: (_: any, record: DeviceData) => (
        <Space>
          <Button type="link" onClick={() => onViewDetail(record)}>Chi tiết</Button>
          <Button type="link" onClick={() => onEdit(record)}>Cập nhật</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="content-card">
        <Space className="filter-section">
          <Space>
            <div>
              <div className="filter-label">Trạng thái hoạt động</div>
              <Select defaultValue="all" className="filter-select">
                <Select.Option value="all">Tất cả</Select.Option>
                <Select.Option value="active">Hoạt động</Select.Option>
                <Select.Option value="inactive">Ngưng hoạt động</Select.Option>
              </Select>
            </div>

            <div>
              <div className="filter-label">Chọn thời gian</div>
              <DatePicker.RangePicker format="DD/MM/YYYY" />
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
          columns={listColumns}
          dataSource={Devices}
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowKey="key"
        />
      </div>

      <Button
        type="primary"
        size="large"
        onClick={onCreateNew}
        className="floating-action-button"
      >
        <span className="floating-button-icon">+</span>
        <span className="floating-button-text">Thêm dịch vụ</span>
      </Button>
    </>
  );
};

export default DeviceList;
