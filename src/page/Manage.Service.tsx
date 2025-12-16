import React, { useState } from "react";

import { Layout, Menu, Button, Breadcrumb } from "antd";
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
import ReportList from "../components/report/ReportList";
import CreateAccout from "../components/settingsystem/CreateAccout";
import ManageAccout from "../components/settingsystem/ManageAccout";
import ManageRole from "../components/settingsystem/MangeRole";
import { Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;


type ViewType = "list" | "detail" | "create";
type PageType = "dashboard" | "devices" | "services" | "settings" | "reports";

const DeviceManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("list");
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);
  const [namePage, setNamePage] = useState("");
  const [namePageSecond, setNamePageSecond] = useState("");
   const [namePageFirst, setNamePageFirst] = useState("");
  const [currentPage, setCurrentPage] = useState<PageType>("devices");

  const handleViewDetail = (record: DeviceData): void => {
    setSelectedDevice(record);
    setCurrentView("detail");
    
  };
    const handleEdit = (record: DeviceData): void => {
      setSelectedDevice(record);
      setCurrentView("create");
       setNamePageFirst("");
      setNamePageSecond("");
    };
    const handleCreateNew = (): void => {
      setSelectedDevice(null);
      setCurrentView("create");
      if (currentPage === "services") {
    setNamePageSecond("> Thêm  dịch vụ");
  }

  if (currentPage === "devices") {
    setNamePageSecond(" > Thêm thiết bị");
  }

  if (currentPage === "settings") {
    setNamePageSecond(" > Thêm tài khoản");
  }
    };
    const handleBack = (): void => {
      setCurrentView("list");
      setSelectedDevice(null);
    }
    const handleSubmit = (data: any): void => {
      console.log("Submitting data:", data);
      handleBack();
    };
    return (
      <Layout className="layout-container">
        <Sider width={200} className="sidebar">
          <div className="logo-container">
            <img src="../../image/alta-logo.png" alt="Logo" className="logo" />
          </div>
          <Menu
            mode="inline"
            selectedKeys={[currentPage]}
            className="sidebar-menu"
          >
            <Menu.Item
              key="dashboard"
              icon={<DashboardOutlined />}
              onClick={() => {
                setCurrentPage("dashboard");
                setCurrentView("list");
                setNamePage("Dashboard");
                setNamePageFirst("")
              }}
            >
              Dashboard
            </Menu.Item>

            <Menu.Item
              key="devices"
              icon={<AppstoreOutlined />}
              onClick={() => {
                setNamePageFirst("")
                setCurrentPage("devices");
                setCurrentView("list");
                setNamePage("Thiết bị");
                setNamePageFirst(" > Danh sách thiết bị")
              }}
            >
              Thiết bị
            </Menu.Item>

            <Menu.Item
              key="services"
              icon={<SettingOutlined />}
              onClick={() => {
                setCurrentPage("services");
                setCurrentView("list");
                setNamePage("Dịch vụ");
                setNamePageFirst(" > Danh sách dịch vụ")
                setNamePageSecond("")
              }}
            >
              Dịch vụ
            </Menu.Item>

            <Menu.Item
              key="reports"
              icon={<BarChartOutlined />}
              onClick={() => {
                setCurrentPage("reports");
                setCurrentView("list");
                setNamePage("Báo cáo");
                setNamePageFirst(" > Lập báo cáo")
                setNamePageSecond("")
              }}
            >
              Báo cáo
            </Menu.Item>
            <Menu.SubMenu
              key="settings"
              icon={<DatabaseOutlined />}
              title="Cài đặt hệ thống"
              onClick={()=>{
                setNamePage("Cài đặt hệ thống")
                setNamePageSecond("")
              }}
            >
              <Menu.Item
                key="role"
                onClick={() => {
                  setCurrentPage("settings");
                  setCurrentView("list");
                  setNamePageFirst(" > Quản lí vai trò");
                  setNamePageSecond("");
                }}
              >
                Quản lý vai trò
              </Menu.Item>

              <Menu.Item
                key="account"
                onClick={() => {
                  setCurrentPage("settings");
                  setCurrentView("create");
                  setNamePageFirst(" > Quản lí tài khoản")
                  setNamePageSecond("")
                }}
              >
                Quản lý tài khoản
              </Menu.Item>

              <Menu.Item
                key="log"
                onClick={() => {
                  setCurrentPage("settings");
                  setCurrentView("detail");
                  setNamePageFirst(" > Nhật kì người dùng")
                  setNamePageSecond("")
                }}
              >
                Nhật ký người dùng
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>

          <div className="logout-container">
            <Button icon={<LogoutOutlined />} type="text" block>
              Đăng xuất
            </Button>
          </div>
        </Sider>

        <Layout>
          <Header className="header">
  {/* LEFT: Breadcrumb */}
  <Breadcrumb className="breadcrumb" separator=">">
    <Breadcrumb.Item>{namePage}</Breadcrumb.Item>

    {namePageFirst && (
      <Breadcrumb.Item className="breadcrumb-link">
        {namePageFirst.replace(" > ", "")}
      </Breadcrumb.Item>
    )}

    {namePageSecond && (
      <Breadcrumb.Item className="breadcrumb-active">
        {namePageSecond.replace(" > ", "")}
      </Breadcrumb.Item>
    )}
  </Breadcrumb>

  {/* RIGHT: User Info */}
  <div className="header-right">
    <Button
      type="text"
      icon={<BellOutlined />}
      className="notification-btn"
    />

    <div className="user-info">
      <Avatar icon={<UserOutlined />} />
      <div className="user-text">
        <span className="hello-text">Xin chào</span>
        <span className="user-name">Lê Quỳnh Ái Vân</span>
      </div>
    </div>
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
            {currentPage === "reports" && (
              <>
                {currentView === "list" && (
                  <ReportList
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
            {currentPage === "settings" && (
              <>
                {currentView === "list" && (
                  <ManageAccout
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
                  <ManageRole
                    onViewDetail={handleViewDetail}
                    onEdit={handleEdit}
                    onCreateNew={handleCreateNew}
                  />
                )}
              </>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  };

  export default DeviceManagement;
