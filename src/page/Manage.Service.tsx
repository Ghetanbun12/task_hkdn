import React, { useState } from "react";

import { Layout, Menu, Button,  Breadcrumb } from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DeviceList from "../components/deviceManage/DeviceList";
import DeviceDetail from "../components/deviceManage/DeviceDetail";
import DeviceForm from "../components/deviceManage/DeviceForm";
import Dashboard from "../components/dashboard/DashBoard";
import ServiceList from "../components/service/ServiceList";
import ServiceDetail from "../components/service/ServiceDetail";
import ServiceForm from "../components/service/ServiceForm";
import "../styles/Manage/ManageDevice.css";
import { DeviceData } from "../store/deviceSlice";

const { Header, Sider, Content } = Layout;


type ViewType = "list" | "detail" | "create";
type PageType = "dashboard" | "devices" | "services" | "numbers" | "reports";

const DeviceManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("list");
  const [selectedDevice, setSelectedDevice] = useState< DeviceData | null>(null);
  const [namePage, setNamePage] = useState("");
  const [currentPage, setCurrentPage] = useState<PageType>("devices");

  const handleViewDetail = (record: DeviceData): void => {
    setSelectedDevice(record);
    setCurrentView("detail");
  };

  const handleEdit = (record: DeviceData): void => {
    setSelectedDevice(record);
    setCurrentView("create");
  };

  const handleCreateNew = (): void => {
    setSelectedDevice(null);
    setCurrentView("create");
  };

  const handleBack = (): void => {
    setCurrentView("list");
    setSelectedDevice(null);
  };

  const handleSubmit = (data: any): void => {
    console.log("Submitting data:", data);
    // Xử lý submit logic ở đây
    handleBack();
  };

  // Menu sidebar
  const menuItems = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "devices", icon: <AppstoreOutlined />, label: "Thiết bị" },
    { key: "services", icon: <SettingOutlined />, label: "Dịch vụ" },
    { key: "numbers", icon: <FileTextOutlined />, label: "Cấp số" },
    { key: "reports", icon: <BarChartOutlined />, label: "Báo cáo" },
    { key: "settings", icon: <DatabaseOutlined />, label: "Cài đặt hệ thống" },
  ];
  return (
    <Layout className="layout-container">
      <Sider width={200} className="sidebar">
        <div className="logo-container">
          <img src="../../image/alta-logo.png" alt="Logo" className="logo" />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["Devices"]}
          className="sidebar-menu"
        >
          {menuItems?.map((item) => (
            <Menu.Item
              onClick={() => {
                setNamePage(item?.label);
                setCurrentPage(item?.key as PageType);
                setCurrentView("list");
                setSelectedDevice(null);
              }}
              key={item?.key}
              icon={item?.icon}
              className={item?.key === "Devices" ? "menu-item-active" : ""}
            >
              {item?.label}
            </Menu.Item>
          ))}
        </Menu>
        <div className="logout-container">
          <Button icon={<LogoutOutlined />} type="text" block>
            Đăng xuất
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header className="header">
          <div className="breadcrumb-wrapper">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>{namePage}</Breadcrumb.Item>
              <Breadcrumb.Item onClick={handleBack} className="breadcrumb-link">
                Danh sách dịch vụ
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-active">
                {selectedDevice ? "Cập nhật" : "Thêm mới"}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="user-info">
            <UserOutlined className="user-icon" />
            Xin chào
            <div className="user-name">Lê Quỳnh Ái Vân</div>
          </div>
        </Header>

        <Content className="main-content">
          {currentPage === "dashboard" && <Dashboard />}

          {currentPage === "devices" && (
            <>
              {currentView === "list" && (
                <DeviceList
                  onViewDetail={handleViewDetail}
                  onEdit={handleEdit}
                  onCreateNew={handleCreateNew}
                />
              )}

              {currentView === "detail" && (
                <DeviceDetail
                  selectedDevice={selectedDevice}
                  onBack={handleBack}
                  onEdit={handleEdit}
                />
              )}

              {currentView === "create" && (
                <DeviceForm
                  // selectedDevice={selectedDevice}
                  selectedDevice={selectedDevice}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                />
              )}
            </>
          )}

          {currentPage === "services" && (
            <>
              {currentView === "list" && (
                <ServiceList
                  onViewDetail={handleViewDetail}
                  onEdit={handleEdit}
                  onCreateNew={handleCreateNew}
                />
              )}

              {currentView === "detail" && (
                <ServiceDetail
                  selectedDevice={selectedDevice}
                  onBack={handleBack}
                  onEdit={handleEdit}
                />
              )}

              {currentView === "create" && (
                <ServiceForm
                  selectedDevice={selectedDevice}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                />
              )}
            </>
          )}
          {currentPage === "numbers" && <div>Number Page</div>}
          {currentPage === "reports" && <div>Report Page</div>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeviceManagement;
