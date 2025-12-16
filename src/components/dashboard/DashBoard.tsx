import React, { useState } from 'react';
import { Card, Row, Col, Select, Progress, Badge } from 'antd';
import { 
  DesktopOutlined, 
  CheckCircleOutlined, 
  MessageOutlined, 
  CloseCircleOutlined 
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import '../../styles/dashboard/Dashboard.css';

const { Option } = Select;

const Dashboard = () => {
  const statsData = [
    {
      icon: <DesktopOutlined />,
      iconBg: 'linear-gradient(180deg, #6493F0 0%, #3758F9 100%)',
      title: 'Số thứ tự đã cấp',
      value: '4.221',
      change: '+3.799',
      changeColor: '#FF9138',
    },
    {
      icon: <CheckCircleOutlined />,
      iconBg: 'linear-gradient(180deg, #60D394 0%, #22C55E 100%)',
      title: 'Số thứ tự đã sử dụng',
      value: '3.721',
      change: '+3.799',
      changeColor: '#52C41A',
    },
    {
      icon: <MessageOutlined />,
      iconBg: 'linear-gradient(180deg, #FFC46A 0%, #FF9138 100%)',
      title: 'Số thứ tự đang chờ',
      value: '468',
      change: '+3.799',
      changeColor: '#FFAC6A',
    },
    {
      icon: <CloseCircleOutlined />,
      iconBg: 'linear-gradient(180deg, #FE6A84 0%, #F86D8A 100%)',
      title: 'Số thứ tự đã bỏ qua',
      value: '32',
      change: '+3.799',
      changeColor: '#F178B6',
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

  // Dữ liệu tổng quan
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

  // Calendar data
  const [currentDate, setCurrentDate] = useState(new Date(2021, 10, 19)); // Nov 19, 2021
  
  const getDaysInMonth = (date:any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    
    // Next month days
    const remainingDays = 35 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
    
    return days;
  };

  const formatMonth = (date:any) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const changeMonth = (delta:any) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Biểu đồ cấp số</h2>

      {/* Stats Cards */}
      <Row gutter={12} style={{ marginBottom: 16 }}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card" bordered={false}>
              <div className="stat-card-body">
                <div className="stat-icon-wrapper" style={{ background: stat.iconBg }}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <div className="stat-title">{stat.title}</div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              </div>
              <div className="stat-footer">
                <span className="stat-change" style={{ color: stat.changeColor }}>
                  <span style={{ fontSize: 16, marginRight: 4 }}>↑</span>
                  {stat.change}
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={12}>
        {/* Chart Section */}
        <Col xs={24} lg={16}>
          <Card 
            className="chart-card"
            title={<span style={{ color: '#FF7506', fontSize: 20, fontWeight: 700 }}>Bảng thống kê theo ngày</span>}
            extra={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>Xem theo</span>
                <Select defaultValue="day" style={{ width: 100 }} size="small">
                  <Option value="day">Ngày</Option>
                  <Option value="week">Tuần</Option>
                  <Option value="month">Tháng</Option>
                </Select>
              </div>
            }
            bordered={false}
          >
            <div style={{ fontSize: 14, color: '#7E7D88', marginBottom: 20 }}>
              Tháng 11/2021
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5185F7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5185F7" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#E5E5E5" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: '#E5E5E5' }}
                  tickLine={false}
                  tick={{ fill: '#A9A9B0', fontSize: 12 }}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A9A9B0', fontSize: 12 }}
                  domain={[0, 5000]}
                  ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#5185F7',
                    border: 'none',
                    borderRadius: 4,
                    color: '#fff',
                    padding: '8px 12px',
                    fontSize: 14,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                  formatter={(value) => [value, '']}
                  labelFormatter={(label) => ``}
                  cursor={{ stroke: '#5185F7', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#5185F7" 
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  dot={{ fill: '#5185F7', strokeWidth: 2, r: 5, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#5185F7', stroke: '#fff', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Overview Section */}
        <Col xs={24} lg={8}>
          <Card 
            className="overview-card" 
            title={<span style={{ color: '#FF7506', fontSize: 20, fontWeight: 700 }}>Tổng quan</span>}
            bordered={false}
          >
            {overviewData.map((item, index) => (
              <div key={index} className="overview-item">
                <div className="overview-header">
                  <div className="progress-wrapper">
                    <Progress
                      type="circle"
                      percent={item.percent}
                      width={60}
                      strokeColor={item.color}
                      strokeWidth={8}
                      format={(percent) => (
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#535261' }}>
                          {percent}%
                        </span>
                      )}
                    />
                  </div>
                  <div className="overview-main">
                    <div className="overview-value">{item.value}</div>
                    <div className="overview-label">
                      <span className="label-icon" style={{ backgroundColor: item.color }}></span>
                      {item.label}
                    </div>
                  </div>
                </div>
                <div className="overview-details">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="overview-detail-row">
                      <div className="detail-left">
                        <span className="detail-dot" style={{ backgroundColor: detail.color }}></span>
                        <span className="detail-text">{detail.text}</span>
                      </div>
                      <span className="detail-value">{detail.value}</span>
                    </div>
                  ))}
                </div>
                {index < overviewData.length - 1 && <div className="overview-divider"></div>}
              </div>
            ))}

            {/* Calendar */}
            <div className="calendar-section">
              <div className="calendar-header">
                <button className="calendar-nav" onClick={() => changeMonth(-1)}>‹</button>
                <span className="calendar-title">{formatMonth(currentDate)}</span>
                <button className="calendar-nav" onClick={() => changeMonth(1)}>›</button>
              </div>
              <div className="calendar-body">
                <div className="calendar-weekdays">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                  ))}
                </div>
                <div className="calendar-days">
                  {getDaysInMonth(currentDate).map((dayObj, idx) => (
                    <div 
                      key={idx} 
                      className={`calendar-day ${!dayObj.isCurrentMonth ? 'other-month' : ''} ${dayObj.day === 19 && dayObj.isCurrentMonth ? 'selected' : ''}`}
                    >
                      {dayObj.day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;