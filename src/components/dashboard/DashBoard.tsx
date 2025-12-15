import React, { useState } from 'react';
import { Card, Row, Col, Select, Progress, Calendar } from 'antd';
import { 
  DesktopOutlined, 
  CheckCircleOutlined, 
  MessageOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import type { Dayjs } from 'dayjs';

const { Option } = Select;

interface StatCardData {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  total: string;
  change: string;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Dữ liệu thống kê
  const statsData: StatCardData[] = [
    {
      icon: <DesktopOutlined style={{ fontSize: 24 }} />,
      iconBg: '#4277FF',
      title: 'Số thứ tự đã cấp',
      value: '4.221',
      total: '4.221',
      change: '+3.799',
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: 24 }} />,
      iconBg: '#35C75A',
      title: 'Số thứ tự đã sử dụng',
      value: '3.721',
      total: '3.721',
      change: '+3.799',
    },
    {
      icon: <MessageOutlined style={{ fontSize: 24 }} />,
      iconBg: '#FFAC6A',
      title: 'Số thứ tự đang chờ',
      value: '468',
      total: '468',
      change: '+3.799',
    },
    {
      icon: <UserOutlined style={{ fontSize: 24 }} />,
      iconBg: '#F178B6',
      title: 'Số thứ tự đã bỏ qua',
      value: '32',
      total: '32',
      change: '+3.799',
    },
  ];

  // Dữ liệu biểu đồ
  const chartData = [
    { date: '01', value: 2800 },
    { date: '07', value: 4000 },
    { date: '13', value: 3200 },
    { date: '19', value: 4221 },
    { date: '25', value: 3800 },
    { date: '31', value: 3500 },
  ];

  // Dữ liệu tổng quan bên phải
  const overviewData = [
    {
      percent: 90,
      value: '4.221',
      label: 'Thiết bị',
      color: '#FF7506',
      details: [
        { text: 'Đang hoạt động', value: '3.799', color: '#FFB800' },
        { text: 'Ngưng hoạt động', value: '422', color: '#7E7D88' },
      ],
    },
    {
      percent: 76,
      value: '276',
      label: 'Dịch vụ',
      color: '#4277FF',
      details: [
        { text: 'Đang hoạt động', value: '210', color: '#4277FF' },
        { text: 'Ngưng hoạt động', value: '66', color: '#7E7D88' },
      ],
    },
    {
      percent: 86,
      value: '4.221',
      label: 'Cấp số',
      color: '#35C75A',
      details: [
        { text: 'Đã sử dụng', value: '3.721', color: '#35C75A' },
        { text: 'Đang chờ', value: '468', color: '#7E7D88' },
        { text: 'Bỏ qua', value: '32', color: '#F178B6' },
      ],
    },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="page-title">Biểu đồ cấp số</h2>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card">
              <div className="stat-card-content">
                <div 
                  className="stat-icon" 
                  style={{ backgroundColor: stat.iconBg }}
                >
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <div className="stat-title">{stat.title}</div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              </div>
              <div className="stat-footer">
                <span className="stat-change positive">{stat.change}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Chart Section */}
        <Col xs={24} lg={16}>
          <Card 
            className="chart-card"
            title="Bảng thống kê theo ngày"
            extra={
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span>Xem theo</span>
                <Select defaultValue="day" style={{ width: 120 }}>
                  <Option value="day">Ngày</Option>
                  <Option value="week">Tuần</Option>
                  <Option value="month">Tháng</Option>
                </Select>
              </div>
            }
          >
            <div style={{ fontSize: 12, color: '#A9A9B0', marginBottom: 16 }}>
              Tháng 11/2021
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A9A9B0' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A9A9B0' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#5185F7',
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                  }}
                  formatter={(value: any) => [value, '']}
                  labelFormatter={(label) => `Ngày ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#5185F7" 
                  strokeWidth={2}
                  dot={{ fill: '#5185F7', r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5185F7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5185F7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Overview Section */}
        <Col xs={24} lg={8}>
          <Card className="overview-card" title="Tổng quan">
            {overviewData.map((item, index) => (
              <div key={index} className="overview-item">
                <div className="overview-header">
                  <Progress
                    type="circle"
                    percent={item.percent}
                    width={60}
                    strokeColor={item.color}
                    format={(percent) => `${percent}%`}
                  />
                  <div className="overview-main">
                    <div className="overview-value">{item.value}</div>
                    <div className="overview-label">{item.label}</div>
                  </div>
                </div>
                <div className="overview-details">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="overview-detail">
                      <span 
                        className="detail-dot" 
                        style={{ backgroundColor: detail.color }}
                      />
                      <span className="detail-text">{detail.text}</span>
                      <span className="detail-value">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Calendar */}
            <div className="calendar-section">
              <div className="calendar-header">
                <button className="calendar-nav">‹</button>
                <span className="calendar-title">19 Nov 2021</span>
                <button className="calendar-nav">›</button>
              </div>
              <Calendar 
                fullscreen={false}
                onSelect={(date) => setSelectedDate(date)}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;