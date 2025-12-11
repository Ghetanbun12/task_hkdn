import React from "react";
import LoginForm from "../../src/components/Login/LoginForm";
import LoginImage from "../components/Login/LoginImage";
import "../styles/Login/LoginPage.css";
const LoginPage = () => {
    return(
        <div className="login-container">
            <div className="login-form">
                {/* <LoginForm/> */}
            </div>
            <div className="login-image">
                <LoginImage/>
            </div>
        </div>
    );
}
export default LoginPage;