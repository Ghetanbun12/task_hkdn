import React, { useState } from "react";
import LoginForm from "./components/Login/LoginForm";
import ResetPassword from "./components/Login/ResetPassowrd";
import ConfirmPassword from "./components/Login/ConfirmPassword";
import LoginImage from "./components/Login/LoginImage";
import LoginImageTwo from "./components/Login/LoginImageTwo";
import "./App.css";
import ServiceManagement from "./page/Manage.Service";

function App() {
  const [page, setPage] = useState("login");

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginForm onForgot={() => setPage("reset")} />;
      case "reset":
        return <ResetPassword onContinue={() => setPage("confirm")} onCancel={() => setPage("login")} />;
      case "confirm":
        return <ConfirmPassword onDone={() => setPage("login")} />;
      default:
        return <LoginForm onForgot={() => setPage("reset")} />;
    }
  };

  const renderImage = () => {
    if (page === "login") return <LoginImage />;
    return <LoginImageTwo />;
  };

  return (
    // <div className="login-container">
    //   <div className="login-form">
    //     {renderPage()}
    //   </div>
    //   <div className="login-image">
    //     {renderImage()}
    //   </div>
    // </div>
    <div>
        <ServiceManagement/>
    </div>
  );
}

export default App;