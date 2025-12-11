import React from "react";
import "../../styles/Login/LoginImage.css";
const LoginImage = () => {
    return(
        <div className="login-image-container">
        <div className="login-image">
            <img src="../../../image/LoginImg.png" alt="" />
        </div>
        <div className="login-title">
            <div className="title-one">Hệ thống</div>
            <div className="title-two">QUẢN LÝ XẾP HÀNG</div>
        </div>
        </div>
    );
};
export default LoginImage;